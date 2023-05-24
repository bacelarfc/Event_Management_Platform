<script>
  import '../../styles/global.css';
  import '../../styles/ticketsFrontpage.css'; 
  import '../../styles/modal.css'; 
  import Nav from '../../components/Nav.svelte';
  import SidePanel from '../../components/SidePanel.svelte';
  import { onMount } from "svelte";
  import { cart, sidePanelOpen } from '../../store/ticketsStore';

  let events = [];

  const addToCart = (event) => {
  const { name, time, description, price } = event;
  cart.update((value) => ({
    ...value,
    event: { name, time, description, price },
    tickets: event.tickets,
    showPaymentPanel: false,
  }));
  sidePanelOpen.set(true);
};

  onMount(async () => {
    try {
      const response = await fetch("http://localhost:8080/events");
      if (!response.ok) {
        console.log('Error: ', response.status, response.statusText);
        return;
      }
      events = await response.json();
      // Initialize tickets property
      events = events.map(event => ({ ...event, tickets: 1 }));
    } catch (error) {
      console.log('Fetch Error: ', error);
    }
  });

</script>

<Nav />
<SidePanel />
<div class="events-container">
  {#each events as event (event._id)}
    <li class="card" aria-labelledby="event card">
      <div class="card__filter">
        <img class="card__photo" src="https://i1.sndcdn.com/artworks-000192685399-co64se-t500x500.jpg" alt="A man in colorful clothing with the sun behind him on a beach." />
      </div>
      <div class="card__container">
        <h2>{event.name}</h2>
        <h3>{event.location}</h3>
        <time>{event.date}</time>
        <p>{event.description}</p>
        <div class="card__buttons">
          <div class="card__buttons btn secondary">
            <img class="card__photo" src="http://localhost:8080/images/{event.image}" alt="{event.name}" />
          </div>
          <button on:click={() => addToCart(event)}>Buy</button>
   
        </div>
      </div>
    </li>
  {/each}
</div>