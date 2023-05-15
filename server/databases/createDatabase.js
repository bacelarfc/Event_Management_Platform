import { MongoClient } from "mongodb";

// MongoDB connection URI
const uri = 'mongodb://127.0.0.1:27017/eventmanager';

// Sample user data
const userData = [
  {
    "_id": "646232d1cfd6080c8242090d",
    "id": "1",
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@example.com",
    "password": "password123",
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
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('eventmanager');
    const usersCollection = database.collection('users');

    // Check if the eventmanager database already exists
    const dbList = await client.db().admin().listDatabases();
    const eventManagerDbExists = dbList.databases.some(db => db.name === 'eventmanager');

    if (eventManagerDbExists) {
      console.log('The "eventmanager" database already exists.');
    } else {
      // Create the "eventmanager" database
      await database.createCollection('users');
      console.log('The "eventmanager" database created successfully.');

      // Populate the "users" collection with sample data
      await usersCollection.insertMany(userData);
      console.log('Users collection populated successfully.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the MongoDB client
    await client.close();
  }
}

// Run the script
main();
