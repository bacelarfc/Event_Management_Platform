<script>
  import "../../styles/adminpages.css";
  import Nav from "../../components/Nav.svelte";
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import { getEvents, deleteEvent } from "../../utils/eventAPI.js";
  import EventSearch from '../../components/EventSearch.svelte';

  let events = [];
  let filteredEvents = [];

  async function fetchData() {
    try {
      events = await getEvents();
      filteredEvents = [...events];
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleDeleteEvent(id) {
    try {
      await deleteEvent(id);
      events = events.filter((event) => event._id !== id);
      filteredEvents = [...events];
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }

  function handleEditEvent(eventId) {
    navigate(`/editEvent/${eventId}`);
  }

  function handleSearch(event) {
    const searchQuery = event.detail;
    filteredEvents = events.filter((event) => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      const lowerCaseEventName = event.name.toLowerCase();
      const lowerCaseEventDate = event.date.toLowerCase();
      const lowerCaseEventLocation = event.location.toLowerCase();

      return (
        lowerCaseEventName.includes(lowerCaseSearchQuery) ||
        lowerCaseEventDate.includes(lowerCaseSearchQuery) ||
        lowerCaseEventLocation.includes(lowerCaseSearchQuery)
      );
    });
  }

  onMount(fetchData);
</script>

<Nav />

<h1>Event List</h1>

<EventSearch on:search={handleSearch} />

<div class="table-container">
  <button class="create-button" on:click={() => navigate(`/createEvent`)}>
    Create new Event
  </button>
  <br />
  <br />
  {#if filteredEvents.length === 0}
    <p>No events</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Location</th>
          <th>Tickets Max</th>
          <th>Tickets left</th>
          <th>Price</th>
          <th>Image name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredEvents as event}
          <tr>
            <td>{event.name}</td>
            <td>{event.date}</td>
            <td>{event.time}</td>
            <td>{event.location}</td>
            <td>{event.ticket_max}</td>
            <td>{event.ticket_left}</td>
            <td>{event.price} EUR</td>
            <td>
              {#if event.image}
                {event.image}
              {:else}
                No image
              {/if}
            </td>
            <td>
              <button
                class="edit-button"
                on:click={() => handleEditEvent(event._id)}
              >
                Edit
              </button>
              <button
                class="delete-button"
                on:click={() => handleDeleteEvent(event._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
