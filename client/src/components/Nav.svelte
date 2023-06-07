<script>
  import Icon from "@iconify/svelte";
  import "../styles/global.css";
  import "../styles/navbar.css"
  import { Link } from "svelte-navigator";
  import { navigate } from "svelte-navigator";
  import { sidePanelOpen } from "../store/ticketsStore";
  import { onMount } from "svelte";
  import { isAuthenticated, isAdmin} from "../store/store.js";
  import { getUserFromToken } from "../utils/auth";
  import ToggleTheme from "./ToggleTheme.svelte";

  function handleLogout() {
  localStorage.removeItem("token");
  isAuthenticated.set(false);
  isAdmin.set(false);
  navigate("/");
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

  function handleLogin() {
    navigate("/login");
  }

  let user;

  onMount(async () => {

  document.addEventListener("click", closeDropdown);
  return () => {
    document.removeEventListener("click", closeDropdown);
  };
});

</script>

<div class="navbar-container">
  <nav>
    <ToggleTheme />
    <ul>
      <li><Link to="/">Home</Link></li>
      <li>
        <button class="cartButton"on:click={openCart}>
          <Icon icon="gridicons:cart" />
        </button>
      </li>
    </ul>
    {#if $isAuthenticated}
      <div class="right-side">
        {#if $isAdmin}
          <div class="dropdown">
            <button class="dropbtn" on:click={handleDropdownClick}>Admin</button>
            <div class="dropdown-content">
              <Link to="/manageUsers">Manage Users</Link>
              <Link to="/manageEvents">Manage Events</Link>
            </div>
          </div>
        {/if}
        <div class="dropdown">
          <button class="dropbtn" on:click={handleDropdownClick}>Account</button>
          <div class="dropdown-content">
            <Link to="/accountSettings">Account Settings</Link>
            <Link to="/accountHistory">History</Link>
          </div>
        </div>
        <button on:click={handleLogout}>Log out</button>
      </div>
    {:else}
      <button on:click={handleLogin}>Log in</button>
    {/if}
  </nav>
</div>