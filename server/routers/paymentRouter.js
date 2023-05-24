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
    const { paymentMethodId, amount, email } = req.body;
    const currency = 'EUR'; // Set the currency to EUR
    console.log(req.body);
    console.log(`Received paymentMethodId: ${paymentMethodId}`)
    // Perform the payment processing logic using the Stripe API
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents and round it
      currency,
  payment_method: paymentMethodId,
  confirm: true,
    });
    console.log(paymentIntent); // add this line

    // Insert order document into the orders collection
    await createOrder(email, paymentIntent.id, Math.round(amount * 100), currency);

    res.json({ success: true, message: 'Payment processed successfully' });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

export default router;