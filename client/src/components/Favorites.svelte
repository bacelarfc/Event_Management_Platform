<script>
    import { onMount } from "svelte";
    import { favorites } from "../store/favoritesStore";
    import { Link } from "svelte-navigator";
    import { deleteFavoriteEvent, getFavoriteEvents } from "../utils/favoritesAPI.js";
  
    let favoriteEvents = [];
  
    onMount(async () => {
    try {
        const userId = /* logic to fetch the user id */
        const events = await getFavoriteEvents(userId); // Pass the user id here
        favorites.set(events);
    } catch (error) {
        console.error("Error fetching favorite events: ", error);
    }
});

  
    $: {
      favoriteEvents = $favorites;
    }
  
    async function handleDelete(eventId) {
      try {
        await deleteFavoriteEvent(eventId); // Assume you have implemented this function to delete a favorite event
        favorites.set(favoriteEvents.filter(e => e._id !== eventId));
      } catch (error) {
        console.error("Error deleting favorite event: ", error);
      }
    }
  </script>
  
  <div>
    <h1>Your Favorite Events</h1>
    <ul>
      {#each favoriteEvents as event (event._id)}
        <li>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          <Link to={`/events/${event._id}`}>View Event</Link>
          <button on:click={() => handleDelete(event._id)}>Remove from Favorites</button>
        </li>
      {/each}
    </ul>
  </div>
  