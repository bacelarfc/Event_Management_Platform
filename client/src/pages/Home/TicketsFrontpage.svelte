<script>
  import Icon from "@iconify/svelte";
  import "../../styles/global.css";
  import "../../styles/ticketsFrontpage.css";
  import "../../styles/modal.css";
  import Nav from "../../components/Nav.svelte";
  import SidePanel from "../../components/SidePanel.svelte";
  import { onMount, onDestroy } from "svelte";
  import { cart, sidePanelOpen } from "../../store/ticketsStore";
  import { io } from "socket.io-client";

  import { events } from "../../store/eventStore.js";

  let socket;

  onMount(async () => {
    try {
      const response = await fetch("http://localhost:8080/events");
      if (!response.ok) {
        console.log('Error: ', response.status, response.statusText);
        return;
      }

      const fetchedEvents = await response.json();
      console.log('Fetched events: ', fetchedEvents);

      events.set(fetchedEvents.map(event => ({ ...event, tickets: 1 })));

      // Connect to socket.io server
      socket = io("http://localhost:8080");
      
      socket.on("connect", () => {
        console.log('Socket.io connection established');
      });

      socket.on("event", newEvent => {
        console.log('New event received: ', newEvent);
        events.update(currEvents => [newEvent, ...currEvents]);
      });

      socket.on("disconnect", (reason) => {
        console.log('Socket.io connection lost: ', reason);
      });

    } catch (error) {
      console.log('Fetch or Socket.io Error: ', error);
    }
  });

  // Don't forget to close the connection when the component is destroyed
  onDestroy(() => {
    if (socket) {
      socket.close();
      console.log('Socket.io connection closed');
    }
  });
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
</script>

<Nav />
<SidePanel />
<div class="events-container">
  {#each $events as event (event._id)}
    <li class="card" aria-labelledby="event card">
      <div class="card__filter">
        <img
          class="card__photo"
          src="http://localhost:8080/images/{event.image}"
          alt={event.name}
        />
      </div>
      <div class="card__container">
        <h2>{event.name}</h2>
        <div class="icon-location">
          <Icon icon="ion:location-outline" />
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
