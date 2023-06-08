<script>
  import { onMount } from "svelte";
  import { loadStripe } from "@stripe/stripe-js";
  import { cart, totalCost, resetCart, step } from "../store/ticketsStore";
  import "../styles/paymentPanel.css";
  import { sidePanelOpen } from "../store/ticketsStore";
  import "toastr/build/toastr.min.css";
  import toastr from "toastr";
  import { getEventById, updateTicketsLeft } from "../utils/eventAPI.js";
  import { createOrder } from "../utils/orderAPI.js";

  export let handlePrevious;

  let stripe;
  let cardElement;

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_PUBLIC_KEY);

  onMount(async () => {
    stripe = await stripePromise;
    const elements = stripe.elements();
    cardElement = elements.create("card");
    cardElement.mount("#card-element");
  });

  const handlePayment = async () => {
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Payment processing error:", error);
    } else {
      try {
        const totalCostValue = $totalCost;
        const eventId = $cart?.event?._id;


        if (
          typeof totalCostValue !== "number" ||
          isNaN(totalCostValue) ||
          totalCostValue < 1
        ) {
          console.error("Invalid total cost");
          return;
        }

        const event = await getEventById(eventId);
        const eventName = event?.name || "";
        

        const orderDateTime = new Date().toLocaleString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });

        const orderDetails = {
          tickets: $cart.tickets,
          amount: totalCostValue,
          email: $cart.customer.email,
          paymentMethodId: paymentMethod.id,
          eventId: eventId,
          eventName: eventName,
          orderDateTime: orderDateTime,
        };

        toastr.info("Processing your order...");

        const response = await createOrder(orderDetails);

        toastr.remove();

        if (response) {
          toastr.success("Order was successful");
          await updateTicketsLeft(eventId, event.ticket_left - $cart.tickets);
          resetCart();
          step.set(1);
        } else {
          toastr.error("Order failed");
        }
        closeCart();
      } catch (err) {
        toastr.remove();
        toastr.error("Order failed");
        console.error("Error while sending payment:", err);
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
    <div id="card-element" />
    <form on:submit|preventDefault={handlePayment}>
      <button type="submit">Pay</button>
    </form>
  </div>
</div>
