const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  User,
  validateSignupInfo,
  validateLoginInfo,
} = require("../models/User");

router.post("/signup", async (req, res) => {
  const validationError = await validateSignupInfo(req.body);
  if (validationError)
    return res
      .status(400)
      .send(`Unable to parse input object. \nReason: ${validationError}`);

  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(400).send("User with such email already exists.");

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const result = await user.save();
    return res.status(200).send(result._id);
  } catch (error) {
    return res
      .status(400)
      .send(`Unable to save User in db. \nReason: ${error.message}`);
  }
});

router.post("/login", async (req, res) => {
  const validationError = await validateLoginInfo(req.body);
  if (validationError)
    return res
      .status(400)
      .send(`Unable to parse input object. \nReason: ${validationError}`);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect email or password.");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Incorrect email or password.");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TTL,
  });
  return res.header("token", token).send(token);
});

module.exports = router;
