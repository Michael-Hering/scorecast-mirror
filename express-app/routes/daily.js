const express = require('express');
const router = express.Router();

// Model
const Daily = require("../models/daily");

//Getting forecast data for given city
router.get('/forecast/:city', (req, res) => {
  var curCity = req.params.city;
  console.log(curCity)
  Daily.find({}, curCity).sort([['date', -1]]).limit(1)
    .exec()
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => console.log(err))
});

module.exports = router;