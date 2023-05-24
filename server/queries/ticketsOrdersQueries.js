import { connectToDb, getDb } from "../databases/connection.js";

const createOrder = async (email, paymentIntentId, amount, currency) => {
  try {
    await connectToDb();
    const ordersCollection = getDb().collection('orders');

    await ordersCollection.insertOne({
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

export default createOrder;