<script>
    export let onSearch;
    let searchQuery = '';
  
    function handleInput() {
      onSearch(searchQuery);
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
  