const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: String,
  bets: [{
    _id: false,
    betId: mongoose.Schema.Types.ObjectId
  }],
 }, {collection: 'users', versionKey: false});

 module.exports = mongoose.model('Users', userSchema);
 