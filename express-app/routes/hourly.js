const express = require('express');
const router = express.Router();

const Hourly = require("../models/hourly");

router.get('/:city', (req, res) => {
  var curCity = req.params.city;
  console.log(curCity)
  Hourly.find({}).select(`${curCity} -_id`).sort('-date').limit(1)
    .exec()
    .then(doc => {
      newDoc = JSON.parse(JSON.stringify(doc))
      var hourly = newDoc[0].denver;
      console.log(hourly);
      res.send(hourly);
    })
    .catch(err => console.log(err))
});

module.exports = router;