  <script>
    import { Router, Route } from 'svelte-navigator';
    import Login from './pages/Login/Login.svelte';
    import SignUp from './pages/SignUp/Signup.svelte';
    import Frontpage from './pages/Home/Frontpage.svelte';
    import ManageUsers from './pages/Admin/ManageUsers.svelte';
    import ManageEvents from './pages/Admin/ManageEvents.svelte';
    import CreateUserForm from './pages/Admin/CreateUserForm.svelte';
    import CreateEventForm from './pages/Admin/CreateEventForm.svelte';
    import EditEventForm from './pages/Admin/EditEventForm.svelte';
    import TicketsFrontpage from "./pages/Home/TicketsFrontpage.svelte";
    import AdminProtectedRoute from './components/AdminProtectedRoute.svelte';
    import ProtectedRoute from './components/ProtectedRoute.svelte';
    import AccountSettings from './pages/Home/AccountSettings.svelte';
    import { onMount, onDestroy } from "svelte";
    import { isAuthenticated, isAdmin } from "./store/store.js";
    import { getUserFromToken } from "./utils/auth";
  
    onMount(async () => {
      const token = localStorage.getItem('token');
      if (token) {
        isAuthenticated.set(true);
        const user = await getUserFromToken();
        isAdmin.set(user.isAdmin);
      }
  
      // Add event listener for storage event
      window.addEventListener('storage', syncAuthentication);
  
      // Cleanup the listener when the component is unmounted
      onDestroy(() => {
        window.removeEventListener('storage', syncAuthentication);
      });
    });
  
    // Function to sync authentication status across tabs
    async function syncAuthentication(event) {
      if (event.key === 'token') {
        if (event.newValue) {
          isAuthenticated.set(true);
          const user = await getUserFromToken();
          isAdmin.set(user.isAdmin);
        } else {
          isAuthenticated.set(false);
          isAdmin.set(false);
        }
      }
    }
  </script>
  
  <Router>
    <Route path="/" component={TicketsFrontpage} />
    <Route path="/login" component={Login} />
    <Route path="/signUp" component={SignUp} />
    <Route path="/manageUsers">
      <AdminProtectedRoute component={ManageUsers} />
    </Route>
    <Route path="/manageEvents">
      <AdminProtectedRoute component={ManageEvents} />
    </Route>
    <Route path="/userForm">
      <AdminProtectedRoute component={CreateUserForm} />
    </Route>
    <Route path="/createEvent">
      <AdminProtectedRoute component={CreateEventForm} />
    </Route>
    <Route path="/editEvent/:eventId">
      <AdminProtectedRoute component={EditEventForm} />
    </Route>
  <Route path="/accountSettings">
    <ProtectedRoute><AccountSettings /></ProtectedRoute>
  </Route>
  <Route path="*" component={TicketsFrontpage} />
</Router>
