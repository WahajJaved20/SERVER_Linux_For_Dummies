const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require('mongoose')
app.use(express.json());
const MONGODB_URI = process.env.MONGODB_CONNECT_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/login", async (req, res) => {
  try {
    const db = mongoose.connection.useDb("Linux_For_Dummies")
    const collection = db.collection('Credentials');
    const result = await collection.find({}).maxTimeMS(30000).toArray();
    console.log(result[0]);
  
    if (!result) {
      res.status(404).json({ message: 'Data not found' });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});