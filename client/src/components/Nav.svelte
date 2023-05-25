<script>
  import "../styles/global.css";
  import "../styles/navbar.css";
  import { Link } from "svelte-navigator";
  import { removeToken } from "../utils/auth.js";
  import { navigate } from "svelte-navigator";
  import { sidePanelOpen } from "../store/ticketsStore";
  import { onMount } from "svelte";

  function handleLogout() {
  removeToken();
  console.log(localStorage.getItem('token')); 
  navigate("/login");
}
  const openCart = () => sidePanelOpen.set(true);

  function handleDropdownClick(event) {
    event.currentTarget.classList.toggle("active");
  }

  function closeDropdown(event) {
    const dropdown = event.currentTarget.parentNode;
    dropdown.classList.remove("active");
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
  <div class="dropdown">
    <button class="dropbtn" on:click={handleDropdownClick}>Account</button>
    <div class="dropdown-content">
      <Link to="/accountSettings">Account Settings</Link>
      <Link to="/history">History</Link>
      <a href="#" on:click|preventDefault={handleLogout}>Logout</a>
    </div>
  </div>
</nav>