const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  bets: [{
    date: String,
    completionDate: String,
    odds: Number,
    won: Boolean,
  }],
 });

 module.exports = mongoose.model('Users', userSchema)