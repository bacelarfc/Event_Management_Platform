import { MongoClient } from 'mongodb';

let dbConnection;

const connectToDb = async () => {
  await MongoClient.connect('mongodb://127.0.0.1:27017/eventmanager')
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