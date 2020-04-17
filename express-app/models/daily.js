const mongoose = require('mongoose');

const dailySchema = mongoose.Schema({
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

module.exports = mongoose.model('Daily', dailySchema);