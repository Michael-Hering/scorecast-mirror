const mongoose = require('mongoose');

const betsSchema = mongoose.Schema({
    city: String,
    date: String,
    type: String,
    odds: Number,
    val: Number,
    weatherFeature: String,
    status: String,
}, {collection: 'bets', versionKey: false});

module.exports = mongoose.model('Bets', betsSchema)