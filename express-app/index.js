// Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

require("dotenv").config();
// Route constants
const users = require("./routes/users");
const tweets = require("./routes/tweets");
const bets = require("./routes/bets");
const hourly = require("./routes/hourly");
const daily = require("./routes/daily");

//-----------------------------------
app.use(express.json()); // to support JSON-encoded bodies

app.use(cors()); // Allow all CORS requests

//Models (collections in the db)
const Hourly = require("./models/hourly");
const Daily = require("./models/daily");

//-----------------------------------
// Connecting to the database
const uri = `mongodb+srv://dbUser:${process.env.MONGO_PASS}@scorecast-cluster-iyipd.gcp.mongodb.net/scorecast?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// CORS
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

// Routing
app.use("/api/users", users);
app.use("/api/bets", bets);
app.use("/hourly", hourly);
app.use("/daily", daily);
app.use("/api/tweets", tweets);

// PORT
const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`listening on ${port}`);
});
