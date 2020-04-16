// Dependencies 
const express = require('express');
const app = express();
const users = require('./routes/users');
const path = require('path');
const querystring = require('querystring');
const mongoose = require('mongoose');
const assert = require('assert');

const uri = "mongodb+srv://dbUser:lHHRGsTDThtYq8zs@scorecast-cluster-iyipd.gcp.mongodb.net/scorecast?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;
//-----------------------------------

var hourlySchema = new Schema({
  city: [{
    time: Number,
    windspeed: Number,
    temp: Number
  }],
}, {collection: 'hourly'});

var Hourly = mongoose.model('Hourly', hourlySchema);

var dailySchema = new Schema({
  city: [{
    time: Number,
    windspeed: Number,
    weather: [{
      id: Number,
      main: String,
      description: String,
      icon: String,
    }],
    max_temp: Number,
    min_temp: Number
  }]
}, {collection: 'daily'})

var Daily = mongoose.model('Daily', dailySchema);


app.use('/api/users', users);

//Getting forecast data for given city
app.get('/:city/forecast/daily', (req, res) => {
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

app.get('/:city/forecast/hourly', (req, res) => {
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

// PORT
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`listening on ${port}`);
});

