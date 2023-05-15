import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

let dbConnection;

const connectToDb = async () => {
  await MongoClient.connect(DATABASE_URL)
    .then((client) => {
      dbConnection = client.db();

    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (!dbConnection) {
    throw new Error('Database connection has not been established.');
  }
  return dbConnection;
};

export { connectToDb, getDb };