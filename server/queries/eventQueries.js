import { connectToDb, getDb } from "../databases/connection.js";
import { ObjectId } from 'mongodb';

export async function getEventById(id) {
  try {
    await connectToDb();
    const db = getDb();
    const eventsCollection = db.collection('events');
    const objectId = new ObjectId(id);
    const event = await eventsCollection.findOne({ _id: objectId });
    return event;
  } catch (error) {
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
    throw error;
  }
}

export async function updateEvent(id, updatedData) {
  try {
    await connectToDb();
    const db = getDb();
    const eventsCollection = db.collection('events');
    const objectId = new ObjectId(id);
    const result = await eventsCollection.updateOne({ _id: objectId }, { $set: updatedData });
    return result.modifiedCount;
  } catch (error) {
    throw error;
  }
}

export async function deleteEvent(id) {
  try {
    await connectToDb();
    const db = getDb();
    const eventsCollection = db.collection('events');
    const objectId = new ObjectId(id);
    const result = await eventsCollection.deleteOne({ _id: objectId });
    return result.deletedCount;
  } catch (error) {
    throw error;
  }
}
