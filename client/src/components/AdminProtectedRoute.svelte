<script>
    import { onMount, onDestroy } from "svelte";
    import { navigate } from "svelte-navigator";
    import { isAuthenticated, isAdmin } from "../store/store.js";
  
    export let component;
  
    let userAuthenticated = false;
    let userIsAdmin = false;
  
    const unsubscribeAuth = isAuthenticated.subscribe((value) => {
      userAuthenticated = value;
      if (!userAuthenticated) {
        navigate("/login");
      }
    });
  
    const unsubscribeAdmin = isAdmin.subscribe((value) => {
      userIsAdmin = value;
      if (userAuthenticated && !userIsAdmin) {
        navigate("/");
      }
    });
  
    onMount(() => {
      if (userAuthenticated && !userIsAdmin) {
        navigate("/");
      }
    });
  
    onDestroy(() => {
      unsubscribeAuth();
      unsubscribeAdmin();
    });
  </script>
  
  {#if userAuthenticated && userIsAdmin}
    <svelte:component this={component} />
  {/if}
  