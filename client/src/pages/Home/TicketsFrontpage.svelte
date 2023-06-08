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
  import EventSearch from "../../components/EventSearch.svelte";

  import { events } from "../../store/eventStore.js";
  import { derived, writable } from "svelte/store";
  import Footer from "../../components/Footer.svelte";
  import { isAuthenticated, isAdmin } from "../../store/store";
  import { getUserFromToken } from "../../utils/auth";
  import Eventur from "../../components/Eventur.svelte";
  import toastr from "toastr";
  import { getToken } from "../../utils/auth";

  let socket;

  onMount(async () => {
    try {
      const response = await fetch("http://localhost:8080/events");
      if (!response.ok) {
        console.log("Error: ", response.status, response.statusText);
        return;
      }

      const fetchedEvents = await response.json();
      console.log("Fetched events: ", fetchedEvents);

      events.set(fetchedEvents.map((event) => ({ ...event, tickets: 1 })));

      // Connect to socket.io server
      socket = io("http://localhost:8080");

      socket.on("connect", () => {
        console.log("Socket.io connection established");
      });

      socket.on("event", (newEvent) => {
        console.log("New event received: ", newEvent);
        events.update((currEvents) => [newEvent, ...currEvents]);
      });

      socket.on("disconnect", (reason) => {
        console.log("Socket.io connection lost: ", reason);
      });
    } catch (error) {
      console.log("Fetch or Socket.io Error: ", error);
    }
  });

  // Don't forget to close the connection when the component is destroyed
  onDestroy(() => {
    if (socket) {
      socket.close();
      console.log("Socket.io connection closed");
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

  const searchQuery = writable("");

  const filteredEvents = derived([events, searchQuery], ([$events, $searchQuery]) => {
    const query = $searchQuery.toLowerCase().trim();

    if (!query) {
      return $events;
    } else {
      return $events.filter((event) => {
        const lowerCaseEventName = event.name.toLowerCase();
        const lowerCaseEventDate = event.date.toLowerCase();
        const lowerCaseEventLocation = event.location.toLowerCase();

          return (
            (lowerCaseEventName.includes(query) ||
              lowerCaseEventDate.includes(query) ||
              lowerCaseEventLocation.includes(query)) &&
            event.ticket_left > 0
          );
        });
      }
    }
  );

  function handleSearch(event) {
    searchQuery.set(event.detail);
  }
</script>

<Nav />
<SidePanel />
<EventSearch on:search={handleSearch} />

<div class="events-container">
  {#each $filteredEvents as event (event._id)}
    {#if event.ticket_left > 0}
      <li class="card" aria-labelledby="event card">
        <div
          class="card-container"
          on:keydown
          on:click={(e) => openModal(e, event._id)}
        >
          <div class="card__filter">
            <img
              class="card__photo"
              src={`http://localhost:8080/images/${
                event.image ? event.image : "default_image.jpeg"
              }`}
              alt={event.name}
              on:error={handleImageError}
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
            <p>Price: {event.price} EUR</p>
            <p>Tickets: {event.ticket_max} / {event.ticket_left}</p>
            <div class="card__buttons">
              <div class="card__buttons btn secondary">
                <input
                  type="number"
                  min="1"
                  max="10"
                  bind:value={event.tickets}
                />
              </div>
              <button on:click|stopPropagation={() => addToCart(event)}
                >Buy</button
              >
            </div>
          </div>
          <button on:click={() => addToCart(event)}>Buy</button>
        </div>

        {#if selectedEventId === event._id}
          <div class="modal {isModalOpen ? 'open' : ''}">
            <div class="modal-content">
              <span class="close" on:keydown on:click={closeModal}>&times;</span
              >
              <h2>{event.name}</h2>
              <h3>{event.location}</h3>
              <p>{event.description}</p>
            </div>
          </div>
        {/if}
      </li>
    {/if}
  {/each}
</div>

<Footer />
