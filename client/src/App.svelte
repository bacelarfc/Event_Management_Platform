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
  import ProtectedRoute from './components/ProtectedRoute.svelte'; 
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
  <Route path="/userForm">
    <ProtectedRoute><CreateUserForm /></ProtectedRoute>
  </Route>
  <Route path="/createEvent">
    <ProtectedRoute><CreateEventForm /></ProtectedRoute>
  </Route>
  <Route path="/editEvent/:eventId">
    <ProtectedRoute><EditEventForm /></ProtectedRoute>
  </Route>
  <Route path="*" component={Frontpage} />
</Router>