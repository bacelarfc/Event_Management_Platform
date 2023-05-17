import { connectToDb, getDb } from "../databases/connection.js";

export async function getEventById(id) {
  try {
    await connectToDb();
    const db = getDb();
    const eventsCollection = db.collection('events');
    const event = await eventsCollection.findOne({ id });
    return event;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function getAllEvents() {
  try {
    await connectToDb();
    const db = getDb();
    const eventsCollection = db.collection('events');
    const events = await eventsCollection.find({}).toArray();
    return events;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function createEvent(event) {
  try {
    await connectToDb();
    const db = getDb();
    const eventsCollection = db.collection('events');

    const result = await eventsCollection.insertOne(event);
    return result.insertedId;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function updateEvent(id, updatedData) {
  try {
    await connectToDb();
    const db = getDb();
    const eventsCollection = db.collection('events');

    const result = await eventsCollection.updateOne({ id }, { $set: updatedData });
    return result.modifiedCount;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function deleteEvent(id) {
  try {
    await connectToDb();
    const db = getDb();
    const eventsCollection = db.collection('events');

    const result = await eventsCollection.deleteOne({ id });
    return result.deletedCount;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
