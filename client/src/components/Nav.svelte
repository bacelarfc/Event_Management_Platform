<script>
  import '../styles/global.css';
  import '../styles/navbar.css';
  import { Link } from 'svelte-navigator';
  import { removeToken } from '../utils/auth.js';
  import { navigate } from 'svelte-navigator';

  function handleLogout() {
    removeToken();
    navigate('/login');
  }
</script>



<nav>
  <ul>
    <li><Link to="/home">Home</Link></li>
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
