const router = require('express').Router();
const { User, userSchema } = require('../models/User');

router.post('/signup', async (req, res) => {
    userSchema.validateAsync(req.body)
        .catch((error) => {
            return res.status(400).send(`Unable to parse input object. \nReason: ${error}`);
        });

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
        .then((result) => {
            return res.status(200).send(result);
        })
        .catch((error) => {
            return res.status(400).send(`Unable to save User in db. \nReason: ${error.message}`)
        });
});

module.exports = router;
