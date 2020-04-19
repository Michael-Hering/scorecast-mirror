const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: String,
  bets: [{
    betId: String
  }],
 });

 module.exports = mongoose.model('Users', userSchema);
 