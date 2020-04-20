const express = require('express');
const router = express.Router();

const Bet = require('../models/bets');
const Users = require('../models/users');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
};

router.get('/', (req, res) => {
    res.send("TESTING BETS");
});

router.get('/:email', async (req, res) => {
    const doc = await Users.findOne( { email: req.params.email } );

    if(doc == null) {
        //no users exists, create one
        var newUser = new Users({email: req.params.email, bets: []})
        newUser.save(function (err, newUser) {
            if (err) return console.error(err);
            console.log(newUser.email + " user added to db.");
          });
        res.send(newUser.bets)
    } else {
        const documents = [];

        await asyncForEach(doc.bets, async (bet) => {
            console.log(bet.betId);
            const betDoc = await Bet.find( {_id: bet.betId });
            documents.push(betDoc);
        });
    
        console.log(documents);
        res.send(documents);
    }
});

router.post('/', async (req, res) => {
    console.log('POST hit', req.body);

    const doc = new Bet();
    doc.city = req.body.city;
    doc.date = req.body.date;
    doc.type = req.body.type;
    doc.odds = req.body.odds;
    doc.val = req.body.val;
    doc.weatherFeature = req.body.weatherFeature;
    doc.status = req.body.status;

    await doc.save();

    var bet = { betId: doc._id }

    // Update user with new bet
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

    console.log(doc);

    res.send(req.body);
});


module.exports = router;