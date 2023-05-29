<script>
  import "../styles/global.css";
  import "../styles/navbar.css";
  import { Link } from "svelte-navigator";
  import { navigate } from "svelte-navigator";
  import { sidePanelOpen } from "../store/ticketsStore";
  import { onMount } from "svelte";
  import { isAuthenticated, logout } from "../store/store.js";

  function handleLogout() {
    localStorage.removeItem("token");
    isAuthenticated.set(false);
    console.log(localStorage.getItem("token")); 
    navigate("/login");
  }

  const openCart = () => sidePanelOpen.set(true);

  function handleDropdownClick(event) {
    event.currentTarget.classList.toggle("active");
  }

  function closeDropdown(event) {
    const dropdown = event.target.closest(".dropdown");
    if (dropdown) {
      dropdown.classList.remove("active");
    } else {
      const dropdowns = document.querySelectorAll(".dropdown");
      dropdowns.forEach((d) => d.classList.remove("active"));
    }
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
