<script>
  import { Router, Route, Link } from 'svelte-navigator';
  import { isAuthenticated } from './store/store.js';
  import Home from './pages/Home/Home.svelte';
  import Login from './pages/Login/Login.svelte';
  import SignUp from './pages/SignUp/Signup.svelte'
  import Frontpage from './pages/Home/Frontpage.svelte';
  import ManageUsers from './pages/Admin/ManageUsers.svelte';
  import ManageEvents from './pages/Admin/ManageEvents.svelte';
  import UserForm from './pages/Admin/UserForm.svelte';

  function requireAuth(route) {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      return Login;
    }
    return route.component;
  }
</script>

<Router>
  <Route path="/login" component="{Login}" />
  <Route path="/signUp" component="{SignUp}" />
  <Route path="/home" component="{requireAuth}" />
  <Route path="/manageUsers" component="{ManageUsers}" />
  <Route path="/manageEvents" component="{ManageEvents}" />
  <Route path="/userForm" component="{UserForm}" />
  <Route path="/" let:params>
    {#if isAuthenticated}
      <Home />
    {:else}
      <Frontpage />
    {/if}
  </Route>
</Router>
