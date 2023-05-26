<script>
  import '../../styles/global.css';
  import '../../styles/ticketsFrontpage.css'; 
  import '../../styles/modal.css'; 
  import Nav from '../../components/Nav.svelte';
  import SidePanel from '../../components/SidePanel.svelte';
  import { onMount } from "svelte";
  import { cart, sidePanelOpen } from '../../store/ticketsStore';
  import SearchBar from '../../components/EventSearch.svelte';

  let events = [];
  let filteredEvents = [];


  const addToCart = (event) => {
    const { _id, name, time, description, price } = event;
    cart.update((value) => ({
      ...value,
      event: { _id, name, time, description, price },
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

      events = events.map(event => ({ ...event, tickets: 1 }));

      // Update filteredEvents initially
      handleSearch('');
    } catch (error) {
      console.log('Fetch Error: ', error);
    }
  });

  function handleSearch(searchQuery) {
    filteredEvents = events.filter((event) => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      const lowerCaseEventName = event.name.toLowerCase();
      const lowerCaseEventDate = event.date.toLowerCase();
      const lowerCaseEventLocation = event.location.toLowerCase();

      return (
        lowerCaseEventName.startsWith(lowerCaseSearchQuery) ||
        lowerCaseEventDate.startsWith(lowerCaseSearchQuery) ||
        lowerCaseEventLocation.startsWith(lowerCaseSearchQuery)
      );
    });
  }
</script>

<Nav />
<SidePanel />

<SearchBar onSearch={handleSearch} />

<div class="events-container">
  {#each filteredEvents as event (event._id)}
    <li class="card" aria-labelledby="event card">
      <div class="card__filter">
        <img class="card__photo" src="http://localhost:8080/images/{event.image}" alt="{event.name}" />
      </div>
      <div class="card__container">
        <h2>{event.name}</h2>
        <div class="icon-location">
          <!-- <Icon icon="ion:location-outline"/> -->
          <h3>{event.location}</h3>
        </div>        
        <time>{event.date}</time>
        <p>{event.description}</p>
        <p>Price: {event.price}DKK</p>
        <div class="card__buttons">
          <div class="card__buttons btn secondary">
            <input type="number" min="1" max="10" bind:value={event.tickets} />
          </div>
          <button on:click={() => addToCart(event)}>Buy</button>
        </div>
      </div>
    </li>
  {/each}
</div>
