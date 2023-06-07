<script>
  import "../../styles/login.css";
  import { login } from "../../utils/auth.js";
  import { navigate } from "svelte-navigator";
  import { isAuthenticated } from "../../store/store.js";
  import { isAdmin } from "../../store/store.js";
  import { getUserFromToken } from "../../utils/auth.js";
  import "toastr/build/toastr.min.css";
  import toastr from "toastr";

  let email = "";
  let password = "";

  async function handleLogin() {
    try {
      const response = await login(email, password);
      if (response && response.token) {
        localStorage.setItem("token", response.token);
       
        const user = await getUserFromToken();
        if (user.isAdmin) {
          isAdmin.set(true);
        }

      isAuthenticated.set(true);

      toastr.success("Welcome " + email);
      navigate("/");
    }
  } catch (error) {
    toastr.error(error.message);
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
    <button class="sign-up" type="button"
      ><a href="/signUp">Not a member? Sign up!</a>
    </button>
    <br />
    <input id="submit-button" type="submit" value="Submit" />
  </form>
</div>
