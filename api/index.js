import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const connectionString = process.env.MONGODB_CONNECT_URI || '';

const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}

let db = conn.db('Linux_For_Dummies');

export default db;


app.get("/login", async (req, res) => {
  try {
    const {id, password} = req.body;
    const collection = db.collection('Credentials');
    collection.find({}).toArray().then((result) => {
      console.log(result[0]);

      if (!result || result.length === 0) {
        res.status(404).json({ message: 'Data not found' });
      } else {
        if(result[0].id == id && result[0].password == password){
          res.status(200).json({ message: 'Login Success' });
        }
      }
    }).catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  });

app.listen(5000, () => console.log('Server ready at http://localhost:5000'));