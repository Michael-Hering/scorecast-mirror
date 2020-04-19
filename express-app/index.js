// Dependencies 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config()
// Route constants
const users = require('./routes/users');
const bets = require('./routes/bets');
const hourly = require('./routes/hourly');
const daily = require('./routes/daily');

//Models (collections in the db)
const Hourly = require("./models/hourly");
const Daily = require("./models/daily");

//-----------------------------------
// Connecting to the database
const uri = `mongodb+srv://dbUser:${process.env.MONGO_PASS}@scorecast-cluster-iyipd.gcp.mongodb.net/scorecast?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());

// Routing
app.use('/api/users', users);
app.use('/api/bets', bets);
app.use('/hourly', hourly);
app.use('/daily', daily);

// PORT
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`listening on ${port}`);
});

