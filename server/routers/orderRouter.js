import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import stripe from 'stripe';
import {
  createOrder,
  getOrderById,
  getOrdersByEmail,
  getAllOrders,
  deleteOrder,
} from '../queries/ticketsOrdersQueries.js';

const router = express.Router();
const stripeClient = new stripe(process.env.STRIPE_API_KEY);
router.use(express.json());


router.get('/orders/id/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await getOrderById(orderId);
    res.json(order);
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json({ error: 'Failed to retrieve order' });
  }
});

router.get('/orders/email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await getOrdersByEmail(email);
    res.json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

router.post('/orders', async (req, res) => {
  try {
    const { eventId, eventName, orderDateTime, paymentMethodId, tickets, amount, email } = req.body;
    const currency = 'EUR';
    console.log(req.body);
    console.log(`Received paymentMethodId: ${paymentMethodId}`);
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirm: true,
    });

    await createOrder(eventId, eventName, orderDateTime, email, paymentIntent.id, tickets, Math.round(amount * 100), currency);

    res.json({ success: true, message: 'Payment processed successfully' });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
});


router.delete('/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedCount = await deleteOrder(orderId);
    res.json({ deletedCount });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

export default router;
