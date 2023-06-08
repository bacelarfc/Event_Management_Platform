<script>
  import "../styles/global.css";
  import "../styles/navbar.css";
  import { Link, navigate } from "svelte-navigator";
  import { cart, sidePanelOpen, resetCart } from "../store/ticketsStore";
  import { onMount } from "svelte";
  import { isAuthenticated, logout } from "../store/store.js";

  function handleLogout() {
    localStorage.removeItem("token");
    isAuthenticated.set(false);
    console.log(localStorage.getItem("token")); 
    navigate("/login");
  }

  function handleLogin() {
    navigate("/login");
  }

  function openCart() {
    sidePanelOpen.set(true);
  }

  function handleDropdownClick(event) {
    event.currentTarget.classList.toggle("active");
  }

  let cartIsEmpty = true;

  $: {
    cartIsEmpty = Object.keys($cart.event).length === 0 &&
      $cart.tickets === 0 &&
      $cart.totalCost === 0 &&
      !$cart.showPaymentPanel &&
      Object.values($cart.customer).every(val => val === '');
  }

  function handleFavorites() {
    navigate("/favorites");
  }
  onMount(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  });
</script>

<nav>
  <ul>
    <li><Link to="/home">Home</Link></li>
    <li><Link to="/ticketsFrontpage">Frontpage</Link></li>
    <li><a href="/dontwant" on:click|preventDefault={openCart}>Cart</a></li>
  </ul>
  <div class="dropdown">
    <button class="dropbtn" on:click={handleDropdownClick}>Admin</button>
    <div class="dropdown-content">
      <Link to="/manageUsers">Manage Users</Link>
      <Link to="/manageEvents">Manage Events</Link>
    </div>
  </div>
  {#if $isAuthenticated}
    <div class="dropdown">
      <button class="dropbtn" on:click={handleDropdownClick}>Account</button>
      <div class="dropdown-content">
        <Link to="/accountSettings">Account Settings</Link>
        <Link to="/history">History</Link>
      </div>
    </div>
    <button on:click={handleLogout}>Log out</button>
  {:else}
    <Link to="/login">Log In</Link>
  {/if}
</nav>
