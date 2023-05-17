import { connectToDb, getDb } from "../databases/connection.js";

export async function getUserByEmail(email) {
  try {
    await connectToDb(); 
    const db = getDb(); 
    const usersCollection = db.collection('users'); 
    const user = await usersCollection.findOne({ email: email });
    return user;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function getAllUsers() {
  try {
    await connectToDb();
    const db = getDb();
    const usersCollection = db.collection('users');
    const users = await usersCollection.find({}).toArray();
    return users;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function createUser(user) {
  try {
    await connectToDb(); 
    const db = getDb(); 
    const usersCollection = db.collection('users');

    const result = await usersCollection.insertOne(user);
    return result.insertedId;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function updateUser(email, updatedData) {
  try {
    await connectToDb(); 
    const db = getDb(); 
    const usersCollection = db.collection('users');

    const result = await usersCollection.updateOne({ email: email }, { $set: updatedData });
    return result.modifiedCount;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function deleteUser(email) {
  try {
    await connectToDb(); 
    const db = getDb(); 
    const usersCollection = db.collection('users');

    const result = await usersCollection.deleteOne({ email: email });
    return result.deletedCount;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
