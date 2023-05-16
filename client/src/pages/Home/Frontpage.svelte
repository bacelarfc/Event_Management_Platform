<script>
    import '../../styles/global.css';
    import { removeToken } from '../../utils/auth.js'; 
  import { navigate } from 'svelte-navigator'; 

  function handleLogin() {
    removeToken();
    navigate('/login');
  }
</script>


    <button on:click={handleLogin}>Log in</button>
  
