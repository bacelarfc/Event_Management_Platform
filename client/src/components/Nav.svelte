<script>
  import "../styles/global.css";
  import "../styles/navbar.css";
  import { Link } from "svelte-navigator";
  import { removeToken } from "../utils/auth.js";
  import { navigate } from "svelte-navigator";
  import { sidePanelOpen } from "../store/ticketsStore";

  function handleLogout() {
  removeToken();
  console.log(localStorage.getItem('token'));  // Add this line
  navigate("/login");
}
  const openCart = () => sidePanelOpen.set(true);

  
</script>

<nav>
  <ul>
    <li><Link to="/home">Home</Link></li>
    <li><Link to="/ticketsFrontpage">Frontpage</Link></li>
    <li><a href="/dontwant" on:click|preventDefault={openCart}>Cart</a></li>
  </ul>
  <div class="dropdown">
    <button class="dropbtn">Admin</button>
    <div class="dropdown-content">
      <Link to="/manageUsers">Manage Users</Link>
      <Link to="/manageEvents">Manage Events</Link>
    </div>
  </div>
  <button on:click={handleLogout}>Log out</button>
</nav>
