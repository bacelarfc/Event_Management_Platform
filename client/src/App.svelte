<script>
  import { Router, Route, Link } from 'svelte-navigator';
  import { isAuthenticated } from './store/store.js';
  import AuthWrapper from './pages/AuthWrapper.svelte';
  import Home from './pages/Home/Home.svelte';
  import Login from './pages/Login/Login.svelte';
  import SignUp from './pages/SignUp/Signup.svelte'
  import Frontpage from './pages/Home/Frontpage.svelte';
</script>

<Router>
  <Route path="/login" component="{Login}" />
  <Route path="/signUp" component="{SignUp}" />
  <Route path="/home" component="{Home}" />
  <Route path="/" let:params>
    {#if $isAuthenticated}
      <Home />
    {:else}
      <Frontpage />
    {/if}
  </Route>
</Router>
