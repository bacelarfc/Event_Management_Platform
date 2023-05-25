<script>
  import { Router, Route, Link } from 'svelte-navigator';
  import { isAuthenticated } from './store/store.js';
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
  import { navigate } from 'svelte-navigator';
  import { onMount, onDestroy } from 'svelte';

  import AuthenticatedRoute from './components/AuthenticatedRoute.svelte';


  let userAuthenticated = false;

// Subscribe to the store
const unsubscribe = isAuthenticated.subscribe(value => {
  userAuthenticated = value;
});

// If authenticated, navigate to home
onMount(() => {
  if(userAuthenticated) {
    navigate('/home');
  }
});

onDestroy(() => {
  unsubscribe();
});

</script>

<Router>
  <Route path="/login" component={Login} />
  <Route path="/signUp" component={SignUp} />
  <AuthenticatedRoute to="/home">
    <Route path="/home" component={Home} />
  </AuthenticatedRoute>
  <AuthenticatedRoute>
  <Route path="/ticketsFrontpage" component={TicketsFrontpage} />
  </AuthenticatedRoute>
  <Route path="/manageUsers" component={ManageUsers} />
  <Route path="/manageEvents" component={ManageEvents} />
  <Route path="/userForm" component={CreateUserForm} />
  <Route path="/createEvent" component={CreateEventForm} />
  <Route path="/editEvent/:eventId" component={EditEventForm} />
  <Route path="/" component={Frontpage} />
</Router>
