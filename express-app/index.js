// Dependencies 
const express = require('express');
const app = express();
const users = require('./routes/users');
const path = require('path')

//-----------------------------------

app.use('/api/users', users);

app.get('/ping', (req, res) => {
  return res.send('pong')
})

// PORT
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`listening on ${port}`);
})

