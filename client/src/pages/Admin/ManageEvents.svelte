<script>
    import "../../styles/adminpages.css";
    import Nav from "../../components/Nav.svelte";
    import { onMount, createEventDispatcher } from "svelte";
    import { navigate } from "svelte-navigator";
    import { getEvents, deleteEvent } from "../../utils/eventAPI.js";

    let eventList = [];
    let filteredEvents = [];
    let searchQuery = "";

    async function fetchData() {
        try {
            eventList = await getEvents();
            filteredEvents = [...eventList];
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function handleDeleteEvent(id) {
        try {
            await deleteEvent(id);
            eventList = eventList.filter((event) => event._id !== id);
            filteredEvents = [...eventList];
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    }

    function handleSearch() {
        filteredEvents = eventList.filter((event) => {
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

    const dispatch = createEventDispatcher();

    function handleEditEvent(eventId) {
        dispatch("editEvent", eventId);
    }

    onMount(fetchData);
</script>

<Nav />

<h1>Event List</h1>

<div class="search-bar">
    <input
        type="text"
        bind:value={searchQuery}
        on:input={handleSearch}
        placeholder="Search event by name, date, or location"
    />
</div>

<div class="table-container">
    <button class="create-button" on:click={() => navigate(`/createEvent`)}>
        Create new Event
    </button>

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
                        <td>{event.price} DKK</td>
                        <td>{event.image}</td>
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
