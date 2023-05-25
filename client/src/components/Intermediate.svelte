<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import { isAuthenticated } from '../store/store.js';
  
    export let targetComponent = null;
  
    let userAuthenticated = false;
  
    const unsubscribe = isAuthenticated.subscribe(value => {
      userAuthenticated = value;
    });
  
    onMount(() => {
      if (!userAuthenticated) {
        navigate('/login');
      }
    });
  </script>
  
  <svelte:component this={userAuthenticated ? targetComponent : null} />