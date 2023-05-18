import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;


const userData = [
  {
    "_id": "646232d1cfd6080c8242090d",
    "firstName": "John",
    "lastName": "Doe",
    "email": "test@test.com",
    "password": "test",
    "isAdmin": false
  },
  {
    "_id": "646232d1cfd6080c8242090e",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "janesmith@example.com",
    "password": "password456",
    "isAdmin": true
  },
  {
    "_id": "646232d1cfd6080c8242090f",
    "firstName": "David",
    "lastName": "Johnson",
    "email": "davidjohnson@example.com",
    "password": "password789",
    "isAdmin": false
  }
];

async function main() {
  const client = new MongoClient(DATABASE_URL);

  try {
    await client.connect();

    const database = client.db();
    const usersCollection = database.collection('users');

    await usersCollection.drop().catch(() => { });

    await usersCollection.insertMany(userData);

    console.log('Users collection created and populated successfully.');
  } catch (error) {

    console.error('An error occurred:', error);
  } finally {

    await client.close();
  }
}

main();
