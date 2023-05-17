import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

const eventData = [
  {
    id: "1",
    name: "Event 1",
    date: "2023-05-20",
    time: "14:00",
    description: "Event 1 description",
    image: "event1.jpg",
    ticket_max: 100,
    ticket_left: 50,
    price: 10
  },
  {
    id: "2",
    name: "Event 2",
    date: "2023-06-10",
    time: "18:30",
    description: "Event 2 description",
    image: "event2.jpg",
    ticket_max: 200,
    ticket_left: 100,
    price: 15
  },
  {
    id: "3",
    name: "Event 3",
    date: "2023-07-05",
    time: "12:00",
    description: "Event 3 description",
    image: "event3.jpg",
    ticket_max: 150,
    ticket_left: 75,
    price: 20
  }
];

async function main() {
  const client = new MongoClient(DATABASE_URL);

  try {
    await client.connect();

    const database = client.db();
    const eventsCollection = database.collection('events');

    await eventsCollection.drop().catch(() => {});

    await eventsCollection.insertMany(eventData);

    console.log('Events collection created and populated successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await client.close();
  }
}

main();
