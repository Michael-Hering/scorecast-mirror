const express = require('express');
const router = express.Router();

const Bet = require('../models/bets');

router.get('/', (req, res) => {
    res.send("TESTING BETS");
});

router.post('/', async (req, res) => {
    console.log('POST hit', req.body);

    const doc = new Bet();
    doc.city = req.body.city;
    doc.date = req.body.date;
    doc.type = req.body.type;
    doc.oods = req.body.odds;
    doc.val = req.body.val;
    doc.weatherFeature = req.body.weatherFeature;
    doc.status = req.body.status;

    await doc.save();

    console.log(doc);

    res.send(req.body);
});


module.exports = router;