const express = require('express');
const router = express.Router();

const Bet = require('../models/bets');
const Users = require('../models/users');

router.get('/', (req, res) => {
    res.send("TESTING BETS");
});

router.get('/:email', (req, res) => {

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

    var bet = { betId: doc._id.toString() }

    Users.findOneAndUpdate(
        { email: req.body.email },
        { $push: { bets: bet }},
        function (err, success) {
            if(err) {
                console.log(err);
            } else {
                console.log(success);
            }
    });

    // Need to get users as well - based on email

    console.log(doc);

    res.send(req.body);
});


module.exports = router;