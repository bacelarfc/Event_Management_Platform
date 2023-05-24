<script>

  import "../styles/global.css";
  import "../styles/navbar.css";
  import { Link } from "svelte-navigator";
  import { removeToken } from "../utils/auth.js";
  import { navigate } from "svelte-navigator";
  import { sidePanelOpen } from "../store/ticketsStore";

  function handleLogout() {
    removeToken();
    navigate("/login");
  }

  const openCart = () => sidePanelOpen.set(true);


</script>

<style>
  /* Add your CSS styles for the dropdown menu here */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
</style>

<nav>
  <ul>
    <li><Link to="/home">Home</Link></li>
    <li><Link to="/ticketsFrontpage">Frontpage</Link></li>
    <li><a href="#" on:click|preventDefault={openCart}>Cart</a></li>
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
