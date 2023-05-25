<script>
  import dotenv from 'dotenv';
  dotenv.config();
  import { onMount } from "svelte";
  import { loadStripe } from '@stripe/stripe-js';
  import { cart, totalCost } from "../store/ticketsStore";
  import '../styles/paymentPanel.css';
  import { sidePanelOpen } from "../store/ticketsStore";

  export let handlePrevious;

  let stripe;
  let cardElement;

  const stripePromise = loadStripe(process.env.STRIPE_API_PUBLIC_KEY);

  onMount(async () => {
    stripe = await stripePromise;
    const elements = stripe.elements();
    cardElement = elements.create('card');
    cardElement.mount('#card-element');
  });

  const handlePayment = async () => {
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Payment processing error:', error);
    } else {
      try {
        const totalCostValue = $totalCost; // Use $totalCost here

        console.log($cart);

        // Validate the totalCost value
        if (typeof totalCostValue !== 'number' || isNaN(totalCostValue) || totalCostValue < 1) {
          console.error('Invalid total cost');
          return;
        }

        const response = await fetch("http://localhost:8080/payment", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round(totalCostValue * 100),
            email: $cart.customer.email,
            paymentMethodId: paymentMethod.id
          })
        });
        console.log("payment method", paymentMethod);
        if (response.ok) {
          const jsonResponse = await response.json();
          console.log(jsonResponse);
        } else {
          console.error("Payment processing error:", await response.text());
        }
        closeCart();
      } catch (err) {
        console.error('Error while sending payment:', err);
      }
    }
  };
  const closeCart = () => sidePanelOpen.set(false);

</script>

<div class="side-panel">
  <button on:click={handlePrevious}>Previous</button>
  <button on:click={closeCart}>Close</button>
  <div class="payment-panel">
    <h2>Payment Details</h2>
    <div id="card-element"></div>
    <form on:submit|preventDefault={handlePayment}>
      <button type="submit">Pay</button>
    </form>
  </div>
</div>
