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

<nav>
  <ul>
    <li><Link to="/home">Home</Link></li>
    <li><Link to="/ticketsFrontpage">Frontpage</Link></li>
    <li><a href="#" on:click|preventDefault={openCart}>Cart</a></li>
  </ul>
  <button on:click={handleLogout}>Log out</button>
</nav>
