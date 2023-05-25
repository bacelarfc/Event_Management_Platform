<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import { isAuthenticated } from "../store/store.js";
  import { getUser } from "../utils/auth.js";

  export let path = "";
  export let component = null;
  let userAuthenticated = false;

  const unsubscribe = isAuthenticated.subscribe(async (value) => {
    userAuthenticated = value;
    if (!userAuthenticated) {
      navigate("/login");
    } else {
      const userData = await getUser();
      if (!userData) {
        navigate("/login");
      }
    }
  });

  onMount(async () => {
    if (!userAuthenticated) {
      navigate("/login");
    } else {
      const userData = await getUser();
      if (!userData) {
        navigate("/login");
      }
    }
  });
</script>

<svelte:component this={userAuthenticated ? component : null} />

{#if !userAuthenticated}
  <script>
    navigate("/login");
  </script>
{/if}