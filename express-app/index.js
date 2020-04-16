// Dependencies 
const express = require('express');
const app = express();
const users = require('./routes/users');
const path = require('path');
const {MongoClient} = require('mongodb')
const mongoose = require('mongoose');

//-----------------------------------

//Creating user
async function createUser(client, newUser){
  const result = await client.db("users").collection("listingsAndReviews").insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main(){

  const uri = "mongodb+srv://dbUser:lHHRGsTDThtYq8zs@scorecast-cluster-iyipd.gcp.mongodb.net/test?retryWrites=true&w=majority";

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await listDatabases(client);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);

app.use('/api/users', users);

app.get('/ping', (req, res) => {
  return res.send('pong')
})

// PORT
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`listening on ${port}`);
})

