import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

let dbConnection;

const connectToDb = async () => {
  try {
    const client = await MongoClient.connect(DATABASE_URL);
    dbConnection = client.db(); 
  } catch (err) {
  }
};

const getDb = () => {
  if (!dbConnection) {
    throw new Error('Error connecting to database.');
  }
  return dbConnection;
};

const getConnection = () => {
  if (!dbConnection) {
    throw new Error('Error connecting to database.');
  }
  return dbConnection.client;
};

export { connectToDb, getDb, getConnection };