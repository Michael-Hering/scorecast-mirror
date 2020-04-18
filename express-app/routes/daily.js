const express = require('express');
const router = express.Router();

// Model
const Daily = require("../models/daily");

//Getting forecast data for given city
router.get('/:city', (req, res) => {
  var curCity = req.params.city;
  console.log(curCity)
  Daily.find({}).select(curCity).sort('-date').limit(1)
    .exec()
    .then(doc => {
      newDoc = JSON.parse(JSON.stringify(doc))
      var nextDayForecast = newDoc[0].denver[1];
      res.send(nextDayForecast);
    })
    .catch(err => console.log(err))
});

module.exports = router;