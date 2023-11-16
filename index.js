const express = require("express");
const { MongoClient } = require('mongodb');
const app = express();
require("dotenv").config();

app.use(express.json());
const MONGODB_URI = process.env.MONGODB_CONNECT_URI;

async function connectMongo() {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const database = client.db('Linux_For_Dummies'); 
    const collection = database.collection('Credentials');

    const result = await collection.findOne();
    console.log(result)
}

connectMongo()
app.get("/login", async (req, res) => {
    try{
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const database = client.db('Linux_For_Dummies'); 
    const collection = database.collection('Credentials');

    const result = await collection.findOne();

    if (!result) {
      res.status(404).json({ message: 'Data not found' });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
  });