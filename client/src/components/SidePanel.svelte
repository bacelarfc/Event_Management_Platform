<script>
  import { cart, sidePanelOpen } from "../store/ticketsStore";
  import "../styles/sidepanel.css";
  import { onMount } from "svelte";
  import PaymentPanel from "./PaymentPanel.svelte";
  import { getUserFromToken } from "../utils/auth";
  import { getEventById } from "../utils/eventAPI";
  import toastr from "toastr";

  let firstName = "";
  let lastName = "";
  let email = "";
  let step = 1;

  onMount(async () => {
    const user = await getUserFromToken();
    if (user) {
      $cart.customer.firstName = user.firstName;
      $cart.customer.lastName = user.lastName;
      $cart.customer.email = user.email;
    }
  });

  const handleNext = async () => {
    if (step === 1) {
      step = 2;
    } else {
      const totalCost = $cart.tickets * $cart.event.price;

      if (isNaN(totalCost) || totalCost < 1) {
        console.error("Invalid total cost");
        return;
      }

      cart.update((cartData) => ({
        ...cartData,
        customer: { firstName, lastName, email },
        totalCost,
        eventId: $cart.event._id,
        showPaymentPanel: true,
      }));
    }

    const eventId = $cart?.event?._id;
    const event = await getEventById(eventId);
    const availableTickets = event.ticket_left - $cart.tickets;

    if (availableTickets < 0) {
      toastr.error("Event has not enough tickets for your order");
      step = 1;
    };
  };

  const handlePrevious = () => {
    step = 1;
  };
</script>

{#if $sidePanelOpen}
  <div class="side-panel">
    <button on:click={() => sidePanelOpen.set(false)}>Close</button>
    <h2>{$cart?.event?.name || ""}</h2>
    {#if step === 1}
      {#if $cart.tickets === 0}
        <p>Your cart is empty.</p>
      {:else}
        <form>
          <label for="email">Email:</label>
          <input
            class="read-only"
            bind:value={$cart.customer.email}
            type="email"
            placeholder="Enter your email"
            readonly
          />
          <label for="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            bind:value={$cart.customer.firstName}
          />
          <label for="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            bind:value={$cart.customer.lastName}
          />
          <label for="tickets">Tickets:</label>
          <input
            id="tickets"
            type="number"
            min="1"
            max="10"
            bind:value={$cart.tickets}
            required
          />
          <p>
            Total cost: {($cart.tickets * $cart.event.price).toFixed(2)} EUR
          </p>
          <button on:click={handleNext}>Next</button>
        </form>
      {/if}
    {:else}
      <PaymentPanel {handlePrevious} />
    {/if}
  </div>
{/if}
