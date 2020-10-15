const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const { User } = require("../models/User");

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.data.id });
    res.send(`Welcome! ${user.name}`);
  } catch (error) {
    res.status(400).send(`Fail to load user data. \nReason: ${error.message}`);
  }
});

module.exports = router;
