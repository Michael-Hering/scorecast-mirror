const mongoose = require('mongoose');

const hourlySchema = mongoose.Schema({
  city: [{
    time: Number,
    windspeed: Number,
    temp: Number
  }],
}, {collection: 'hourly'});

module.exports = mongoose.model('Hourly', hourlySchema)