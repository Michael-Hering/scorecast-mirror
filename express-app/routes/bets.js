const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("TESTING BETS");
});

router.post('/', (req, res) => {
    console.log('POST hit', req.body);
    res.send(req.body);
});


module.exports = router;