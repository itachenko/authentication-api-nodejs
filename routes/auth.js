const router = require('express').Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send(`Unable to save User in db. \nReason: ${error.message}`)
        });
});

module.exports = router;
