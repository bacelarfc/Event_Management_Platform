<script>
  import "../../styles/ticketsFrontpage_Modified.css";
  import "../../styles/eventsModal.css";
  import Icon from "@iconify/svelte";
  import Nav from "../../components/Nav.svelte";
  import SidePanel from "../../components/SidePanel.svelte";
  import { onMount, onDestroy } from "svelte";
  import { cart, sidePanelOpen } from "../../store/ticketsStore";
  import { io } from "socket.io-client";
  import EventSearch from "../../components/EventSearch.svelte";
  import { navigate } from "svelte-navigator";
  import { events } from "../../store/eventStore.js";
  import { derived, writable } from "svelte/store";
  import Footer from "../../components/Footer.svelte";
  import { isAuthenticated, isAdmin } from "../../store/store";
  import { getUserFromToken } from "../../utils/auth";
  import Eventur from "../../components/Eventur.svelte";

  let socket;
  let selectedEventId = null;
  let isModalOpen = false;

  const closeModal = () => {
    selectedEventId = null;
    isModalOpen = false;
  };

  const openModal = (event, id) => {
    isModalOpen = true;
    event.preventDefault(); 
    selectedEventId = id;
  };

  onMount(async () => {
    try {
      const response = await fetch("http://localhost:8080/events");
      if (!response.ok) {
        console.log("Error: ", response.status, response.statusText);
        return;
      }

      const fetchedEvents = await response.json();
      events.set(fetchedEvents.map((event) => ({ ...event, tickets: 1 })));

      socket = io("http://localhost:8080");

      socket.on("connect", () => {
        console.log("Socket.io connection established");
      });

      socket.on("event", (newEvent) => {
        events.update((currEvents) => [newEvent, ...currEvents]);
      });

      socket.on("disconnect", (reason) => {
        console.log("Socket.io connection lost: ", reason);
      });

      socket.on("eventUpdated", ({ id, updatedData }) => {
        events.update((currEvents) =>
          currEvents.map((event) =>
            event._id === id ? { ...event, ...updatedData } : event
          )
        );
      });

      socket.on("eventDeleted", (id) => {
        events.update((currEvents) =>
          currEvents.filter((event) => event._id !== id)
        );
      });

      socket.on("adminStatusChanged", async ({ email, newAdminStatus }) => {
        const user = await getUserFromToken();
        isAdmin.set(user.isAdmin);
      });

    } catch (error) {
      console.log("Fetch or Socket.io Error: ", error);
    }
  });

  onDestroy(() => {
    if (socket) {
      socket.close();
      console.log("Socket.io connection closed");
    }
  });

  const addToCart = (event) => {
    const { _id, name, time, description, price } = event;

    let authenticated;
    isAuthenticated.subscribe((value) => (authenticated = value));

    if (!authenticated) {
      navigate("/login");
    } else {
      cart.update((value) => ({
        ...value,
        event: { _id, name, time, description, price },
        tickets: event.tickets,
        showPaymentPanel: false,
      }));
      sidePanelOpen.set(true);
    }
  };

  const searchQuery = writable("");

  const filteredEvents = derived(
    [events, searchQuery],
    ([$events, $searchQuery]) => {
      const query = $searchQuery.toLowerCase().trim();

      if (!query) {
        return $events.filter((event) => event.ticket_left > 0);
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

  const handleImageError = (event) => {
    event.target.src = "http://localhost:5173/images/concert.jpeg";
  };
</script>

<Nav />
<Eventur />
<SidePanel />
<EventSearch on:search={handleSearch} />

<div class="events-container">
  {#each $filteredEvents as event (event._id)}
    {#if event.ticket_left > 0}
      <li class="card" aria-labelledby="event card">
        <div class="card-container" on:keydown on:click={(e) => openModal(e, event._id)}>
          <div class="card__filter">
            <img
              class="card__photo"
              src={`http://localhost:8080/images/${event.image}`}
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
              <button on:click|stopPropagation={() => addToCart(event)}>Buy</button>
            </div>
          </div>
        </div>

        {#if selectedEventId === event._id}
          <div class="modal {isModalOpen ? 'open' : ''}">
            <div class="modal-content">
              <span class="close" on:keydown on:click={closeModal}>&times;</span>
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