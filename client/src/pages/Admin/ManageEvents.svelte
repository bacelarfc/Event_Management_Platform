<script>
    import "../../styles/adminpages.css";
    import Nav from "../../components/Nav.svelte";
    import { onMount } from "svelte";
    import { navigate } from "svelte-navigator";
    import "toastr/build/toastr.min.css";
    import toastr from "toastr";
    import { getEvents, deleteEvent } from "../../utils/eventAPI.js";

    let eventList = [];

    async function fetchData() {
        try {
            eventList = await getEvents();
        } catch (error) {
            toastr.error("Couldn't get resources");
            console.error("Error fetching data:", error);
        }
    }

    async function handleDeleteEvent(id) {
        try {
            await deleteEvent(id);
            toastr.success("Event was deleted");
            eventList = eventList.filter((event) => event._id !== id);
        } catch (error) {
            toastr.error("Error deleting event");
            console.error("Error deleting event:", error);
        }
    }

    onMount(fetchData);
</script>

<Nav />

<h1>Event List</h1>

<div class="table-container">
    <button class="create-button" on:click={() => navigate(`/createEvent`)}
        >Create new Event</button
    >

    {#if eventList.length === 0}
        <p>No events</p>
    {:else}
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Tickets left</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each eventList as event}
                    <tr>
                        <td>{event.name}</td>
                        <td>{event.date}</td>
                        <td>{event.time}</td>
                        <td>{event.location}</td>
                        <td>{event.ticket_left}</td>
                        <td>{event.price} DKK</td>
                        <td>
                            <button
                                class="edit-button"
                                on:click={() =>
                                    navigate(`/editEvent/${event._id}`)}
                                >Edit</button
                            >
                            <button
                                class="delete-button"
                                on:click={() => handleDeleteEvent(event._id)}
                                >Delete</button
                            >
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
</div>
