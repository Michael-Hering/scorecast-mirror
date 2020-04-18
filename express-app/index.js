// Dependencies 
const express = require('express');
const app = express();
const users = require('./routes/users');
const bets = require('./routes/bets');
const path = require('path')
const bodyParser = require('body-parser');

//-----------------------------------

app.use(bodyParser.json());

app.use('/api/users', users);

app.use('/api/bets', bets);

app.get('/ping', (req, res) => {
  return res.send('pong')
})

// PORT
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`listening on ${port}`);
})

