import { connectToDb, getDb } from "../databases/connection.js";

import { ObjectId } from 'mongodb';

export async function addEventToFavorites(userId, eventId) {
    try {
      await connectToDb();
      const db = getDb();
      const usersCollection = db.collection('users');
  
     
const result = await usersCollection.updateOne(
  { _id: new ObjectId(userId) },
  { $addToSet: { favorites: eventId } }
);
  
      return result.modifiedCount;
    } catch (error) {
      throw error;
    }
  }
  
  export async function removeEventFromFavorites(userId, eventId) {
    try {
      await connectToDb();
      const db = getDb();
      const usersCollection = db.collection('users');
  
      const result = await usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { favorites: eventId } }
      );
  
      return result.modifiedCount;
    } catch (error) {
      throw error;
    }
  }
  
  