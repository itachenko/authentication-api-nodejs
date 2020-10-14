const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { User, validateSignupInfo } = require('../models/User');

router.post('/signup', async (req, res) => {
    const error = await validateSignupInfo(req.body);
    if (error) return res.status(400).send(`Unable to parse input object. \nReason: ${error}`);

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).send('User with such email already exists.');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    user.save()
        .then((result) => {
            return res.status(200).send(result);
        })
        .catch((error) => {
            return res.status(400).send(`Unable to save User in db. \nReason: ${error.message}`);
        });
});

module.exports = router;
