import { connectToDb, getDb } from "../databases/connection.js";

export async function createOrder(eventId, email, paymentIntentId, amount, currency) {
  try {
    await connectToDb();
    const ordersCollection = getDb().collection('orders');

    await ordersCollection.insertOne({
      eventId: eventId,
      email: email,
      paymentIntentId: paymentIntentId,
      amount: amount,
      currency: currency,
    });

    console.log('Order created successfully!');
  } catch (error) {
    console.error('Error creating order:', error);
  }
};

export async function getOrderById(id) {
  try {
    await connectToDb();
    const db = getDb();
    const ordersCollection = db.collection('orders');
    const objectId = new ObjectId(id);
    const order = await ordersCollection.findOne({ _id: objectId });
    return order;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function getOrdersByEmail(email) {
  try {
    await connectToDb();
    const db = getDb();
    const ordersCollection = db.collection('orders');
    const orders = await ordersCollection.find({ email }).toArray();
    return orders;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function getAllOrders() {
  try {
    await connectToDb();
    const db = getDb();
    const ordersCollection = db.collection('orders');
    const orders = await ordersCollection.find({}).toArray();
    return orders;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function updateOrder(id, updatedData) {
  try {
    await connectToDb();
    const db = getDb();
    const ordersCollection = db.collection('orders');
    const objectId = new ObjectId(id);
    const result = await ordersCollection.updateOne({ _id: objectId }, { $set: updatedData });
    return result.modifiedCount;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function deleteOrder(id) {
  try {
    await connectToDb();
    const db = getDb();
    const ordersCollection = db.collection('orders');
    const objectId = new ObjectId(id);
    const result = await ordersCollection.deleteOne({ _id: objectId });
    return result.deletedCount;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}