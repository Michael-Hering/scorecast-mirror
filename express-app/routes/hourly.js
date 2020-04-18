const express = require('express');
const router = express.Router();

const Hourly = require("../models/hourly");

router.get('/wind/:city', (req, res) => {
  var curCity = req.params.city;
  console.log(curCity)
  Hourly.find({}, curCity).sort([['date', -1]]).limit(1)
    .exec()
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => console.log(err))
});

module.exports = router;