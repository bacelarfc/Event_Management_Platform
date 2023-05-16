import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const userData = [
  {
    "_id": "646232d1cfd6080c8242090d",
    "id": "1",
    "firstName": "John",
    "lastName": "Doe",
    "email": "test@test.com",
    "password": "test",
    "isAdmin": false
  },
  {
    "_id": "646232d1cfd6080c8242090e",
    "id": "2",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "janesmith@example.com",
    "password": "password456",
    "isAdmin": true
  },
  {
    "_id": "646232d1cfd6080c8242090f",
    "id": "3",
    "firstName": "David",
    "lastName": "Johnson",
    "email": "davidjohnson@example.com",
    "password": "password789",
    "isAdmin": false
  }
];

async function main() {
  const client = new MongoClient(process.env.DATABASE_URL);

  try {
    await client.connect();

    const database = client.db('eventmanager');
    const usersCollection = database.collection('users');

    const dbList = await client.db().admin().listDatabases();
    const eventManagerDbExists = dbList.databases.some(db => db.name === 'eventmanager');

    if (eventManagerDbExists) {
      console.log('The "eventmanager" database already exists.');
    } else {

      await database.createCollection('users');
      console.log('The "eventmanager" database created successfully.');

      await usersCollection.insertMany(userData);
      console.log('Users collection populated successfully.');
    }
  } catch (error) {

    console.error('An error occurred:', error);
  } finally {

    await client.close();
  }
}

main();
