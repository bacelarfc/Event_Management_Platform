<script>
  import { cart, sidePanelOpen } from "../store/ticketsStore";
  import '../styles/sidepanel.css';
  import PaymentPanel from "./PaymentPanel.svelte";

  let name = '';
  let surname = '';
  let email = '';
  let step = 1;

  const handleNext = () => {
  if (step === 1) {
    step = 2;
  } else {
    // Calculate total cost
   // Calculate total cost
   const totalCost = $cart.tickets * $cart.event.price;

    // Validate the total cost
    if (isNaN(totalCost) || totalCost < 1) {
      console.error('Invalid total cost');
      // Handle the error condition appropriately (e.g., show an error message to the user)
      return;
    }

    cart.update((cartData) => ({ 
      ...cartData, 
      customer: { name, surname, email },
      totalCost, // Add total cost to cart data
      showPaymentPanel: true 
    }));
  }
};

  const handlePrevious = () => {
    step = 1;
  };
</script>

{#if $sidePanelOpen}
  <div class="side-panel">
    <button on:click={() => sidePanelOpen.set(false)}>Close</button>
    <h2>{$cart?.event?.name || ''}</h2>
    {#if step === 1}
      <form>
        <label for="name">Name:</label>
        <input id="name" type="text" bind:value={name} />
        <label for="surname">Surname:</label>
        <input id="surname" type="text" bind:value={surname}  />
        <label for="email">Email:</label>
        <input bind:value={$cart.customer.email} type="email" placeholder="Enter your email" />
        <label for="tickets">Tickets:</label>
        <input id="tickets" type="number" min="1" max="10" bind:value={$cart.tickets} required />
        <p>Total cost: {(($cart.tickets * $cart.event.price).toFixed(2))}</p>
        <button on:click={handleNext}>Next</button>
      </form>
    {:else}
      <!-- Payment panel content -->
      <PaymentPanel {handlePrevious} />
    {/if}
  </div>
{/if}