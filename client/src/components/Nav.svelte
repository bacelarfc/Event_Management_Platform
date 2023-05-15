<script>
    import '../styles/global.css';
    import '../styles/navbar.css';
    
    import { Link } from 'svelte-navigator';
    import { removeToken } from '../utils/auth.js'; 
  import { navigate } from 'svelte-navigator'; 

  function handleLogin() {
    removeToken();
    navigate('/login');
  }
</script>
<nav>
  <ul>
      <li><Link to="/">Home</Link></li>
    </ul>
    <button on:click={handleLogin}>Log in</button>
  </nav>
  

  