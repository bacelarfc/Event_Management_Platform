<script>
    import "../styles/eventsModal.css";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    export let event = null;
  
    function close() {
      dispatch('close');
    }
  </script>
  
  <div class="modal">
    <div class="modal-content">
      <span class="close"on:keydown on:click={close}>&times;</span>
      <h2>{event.name}</h2>
      <h3>{event.location}</h3>
      <p>{event.description}</p>
    </div>
  </div>