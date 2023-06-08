<script>
  import { onDestroy } from "svelte";
  import { navigate } from "svelte-navigator";
  import { isAuthenticated } from "../store/store.js";
  

  let userAuthenticated = false;

  const unsubscribe = isAuthenticated.subscribe((value) => {
    userAuthenticated = value;
    if (!userAuthenticated) {
      navigate("/login");
    }
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

{#if userAuthenticated}
  <slot />
{/if}
