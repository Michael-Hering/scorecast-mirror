const express = require('express');
const router = express.Router();

// Model
const Daily = require("../models/daily");

//Getting forecast data for given city
router.get('/:city', (req, res) => {
  var curCity = req.params.city;
  console.log(curCity)
  Daily.find({}).select(curCity)
    .exec()
    .then(doc => {
      newDoc = JSON.parse(JSON.stringify(doc))
      var recentDate = new Date("02/10/2012"); // setting arbitrary low date
      for (var i = 0; i < newDoc.length; i++) {
        //getting timestamp based off of document ID
        timestamp = newDoc[i]._id.toString().substring(0,8)
        date = new Date( parseInt( timestamp, 16 ) * 1000 )
        if(date.getTime() > recentDate){
          //only grabbing most recentDate and setting doc equal to it
          recentDate = date;
          recentDoc = newDoc[i]
        }
      }
      var nextDayForecast = recentDoc;
      res.send(nextDayForecast);
    })
    .catch(err => console.log(err))
});

module.exports = router;