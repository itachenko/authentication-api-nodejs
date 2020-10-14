const router = require('express').Router();

router.post('/signup', (req, res) => {
    res.send(req.body);
});

module.exports = router;
