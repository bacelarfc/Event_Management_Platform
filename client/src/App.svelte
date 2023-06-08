<script>
  import { Router, Route } from 'svelte-navigator';
  import Home from './pages/Home/Home.svelte';
  import Login from './pages/Login/Login.svelte';
  import SignUp from './pages/SignUp/Signup.svelte'
  import Frontpage from './pages/Home/Frontpage.svelte';
  import ManageUsers from './pages/Admin/ManageUsers.svelte';
  import ManageEvents from './pages/Admin/ManageEvents.svelte';
  import CreateUserForm from './pages/Admin/CreateUserForm.svelte';
  import CreateEventForm from './pages/Admin/CreateEventForm.svelte'
  import EditEventForm from './pages/Admin/EditEventForm.svelte'
  import TicketsFrontpage from "./pages/Home/TicketsFrontpage.svelte";
  import CreateEventForm from "./pages/Admin/CreateEventForm.svelte";
  import EditEventForm from "./pages/Admin/EditEventForm.svelte";
  import AdminProtectedRoute from "./components/AdminProtectedRoute.svelte";
  import ProtectedRoute from "./components/ProtectedRoute.svelte";
  import AccountSettings from "./pages/Home/AccountSettings.svelte";
  import AccountHistory from "./pages/Home/AccountHistory.svelte";
  import Favorites from "./components/Favorites.svelte";
  import ProtectedRoute from './components/ProtectedRoute.svelte'; 
  import AccountSettings from './pages/Home/AccountSettings.svelte';
  import { onMount, onDestroy } from "svelte";
  import { isAuthenticated } from "./store/store.js";

  onMount(() => {
    const token = localStorage.getItem('token');
    if (token) {
      isAuthenticated.set(true);
    }

    // Add event listener for storage event
    window.addEventListener('storage', syncAuthentication);

    // Cleanup the listener when the component is unmounted
    onDestroy(() => {
      window.removeEventListener('storage', syncAuthentication);
    });
  });

  // Function to sync authentication status across tabs
  function syncAuthentication(event) {
    if (event.key === 'token') {
      if (event.newValue) {
        isAuthenticated.set(true);
      } else {
        isAuthenticated.set(false);
      }
    }
  }
</script>

<Router>
  <Route path="/" component={Frontpage} />
  <Route path="/login" component={Login} />
  <Route path="/signUp" component={SignUp} />
  <Route path="/home">
    <ProtectedRoute><Home /></ProtectedRoute>
  </Route>
  <Route path="/ticketsFrontpage">
    <ProtectedRoute><TicketsFrontpage /></ProtectedRoute>
  </Route>
  <Route path="/manageUsers">
    <ProtectedRoute><ManageUsers /></ProtectedRoute>
  </Route>
  <Route path="/manageEvents">
    <ProtectedRoute><ManageEvents /></ProtectedRoute>
  </Route>
  <Route path="/favorites">
    <ProtectedRoute><Favorites /></ProtectedRoute>
  </Route>
  <Route path="/userForm">
    <ProtectedRoute><CreateUserForm /></ProtectedRoute>
  </Route>
  <Route path="/createEvent">
    <ProtectedRoute><CreateEventForm /></ProtectedRoute>
  </Route>
  <Route path="/editEvent/:eventId">
    <ProtectedRoute><EditEventForm /></ProtectedRoute>
  </Route>
  <Route path="/accountSettings">
    <ProtectedRoute><AccountSettings /></ProtectedRoute>
  </Route>
  <Route path="*" component={Frontpage} />
</Router>