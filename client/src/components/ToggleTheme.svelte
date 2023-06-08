<script>
  import { onMount } from "svelte";
  import { theme } from "../store/themeStore.js";
  import { socket } from "../utils/socket.js";
  import Icon from '@iconify/svelte';
  import "../styles/global.css";

  let body;

  const toggleTheme = async () => {
    theme.update(value => value === 'dark' ? 'light' : 'dark');
    socket.emit('toggle-theme');
  };

  onMount(() => {
    body = document.body;
    body.classList.add($theme === 'light' ? 'light-theme' : 'dark-theme');

    theme.subscribe(value => {
      body.classList.remove('light-theme', 'dark-theme');
      body.classList.add(value === 'light' ? 'light-theme' : 'dark-theme');
    });

    socket.on("themeChanged", (newTheme) => {
      theme.set(newTheme);
    });
  });
</script>

<button class="toggleButton" on:click={toggleTheme}>
  {#if $theme === 'dark'}
    <Icon icon="ion:sunny-outline" />
  {:else}
    <Icon icon="ion:moon-outline" />
  {/if}
</button>
