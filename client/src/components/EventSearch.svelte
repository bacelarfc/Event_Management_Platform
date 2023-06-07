<script>
  import { createEventDispatcher } from "svelte";
  
  export let searchQuery = "";

  const dispatch = createEventDispatcher();

  function handleInput() {
    dispatch("search", searchQuery);
  }
</script>

<div class="search-bar">
  <input
    type="text"
    bind:value={searchQuery}
    on:input={handleInput}
    placeholder="Search event by name, date, or location"
  />
</div>
