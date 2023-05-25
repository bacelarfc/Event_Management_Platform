<script>
    import { onMount, onDestroy } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import { isAuthenticated } from '../store/store.js';
  
    export let targetComponent = null;
  
    let userAuthenticated = false;
  
    const unsubscribe = isAuthenticated.subscribe(value => {
      userAuthenticated = value;
    });
  
    $: if (!userAuthenticated) {
      navigate('/login');
    }
  
    onDestroy(() => {
      unsubscribe();
    });
  </script>
  
  <svelte:component this={userAuthenticated ? targetComponent : undefined} />