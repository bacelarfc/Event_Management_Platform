import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import stripe from 'stripe';
import  createOrder from '../queries/ticketsOrdersQueries.js';

const router = express.Router();
const stripeClient = new stripe(process.env.STRIPE_API_KEY);
router.use(express.json());

router.post('/payment', async (req, res) => {
  try {
    const {eventId, paymentMethodId, amount, email,  } = req.body;
    const currency = 'EUR'; 
    console.log(req.body);
    console.log(`Received paymentMethodId: ${paymentMethodId}`)
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
  payment_method: paymentMethodId,
  confirm: true,
    });
    console.log(paymentIntent); 
    await createOrder(eventId, email, paymentIntent.id, Math.round(amount * 100), currency);

    res.json({ success: true, message: 'Payment processed successfully' });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

export default router;