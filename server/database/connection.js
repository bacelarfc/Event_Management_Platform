import { MongoClient } from 'mongodb';

let dbConnection;

const connectToDb = () => {
  MongoClient.connect('mongodb://127.0.0.1:27017/eventmanager')
    .then((client) => {
      dbConnection = client.db();
  
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => dbConnection;

export { connectToDb, getDb };