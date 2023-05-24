<script>
  import "../../styles/login.css";
  import { login } from "../../utils/auth.js";
  import { navigate } from "svelte-navigator";

  let email = "";
  let password = "";
  let errorMessage = "";

  async function handleLogin() {
    try {
      const response = await login(email, password);
      const token = response.token;
      localStorage.setItem("jwtToken", token);
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Error logging in", error.message);
    }
  }
</script>

<div class="login">
  <div class="login-triangle" />
  <form
    class="login-container"
    on:submit|preventDefault={handleLogin}
    method="POST"
  >
    <h2>Login</h2>
    <ion-icon name="flower-outline" class="login__icon" />

    <label for="username">Username:</label>
    <input
      class="input-field"
      type="email"
      bind:value={email}
      placeholder="Email"
      required
    />
    <label for="password">Password:</label>
    <input
      class="input-field"
      type="password"
      bind:value={password}
      placeholder="Password"
      required
    />
    {#if errorMessage}
      <p>{errorMessage}</p>
    {/if}
    <button class="sign-up" type="button"
      ><a href="/signUp">Not a member? Sign up!</a>
    </button>
    <br />
    <input id="submit-button" type="submit" value="Submit" />
  </form>
</div>
