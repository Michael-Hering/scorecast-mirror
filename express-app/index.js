// Dependencies 
const express = require('express');
const app = express();
const users = require('./routes/users');
const tweets = require('./routes/tweets');
const path = require('path')
const cors = require('cors')


//-----------------------------------
app.use(express.json())       // to support JSON-encoded bodies

app.use(cors()) // Allow all CORS requests

app.use('/api/users', users);

app.use('/api/tweets', tweets);

app.get('/ping', (req, res) => {
  return res.send('pong')
})

// PORT
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`listening on ${port}`);
})

