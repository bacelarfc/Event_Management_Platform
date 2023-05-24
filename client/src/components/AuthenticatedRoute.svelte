<!-- AuthenticatedRoute.svelte -->
<script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-navigator";
    import { isAuthenticated } from "../store/store.js";

    export let to = "";
    let userAuthenticated = false;

    const unsubscribe = isAuthenticated.subscribe((value) => {
        userAuthenticated = value;
    });

    onMount(() => {
        if (!userAuthenticated) {
            navigate("/login");
        }
    });
</script>

<slot></slot>