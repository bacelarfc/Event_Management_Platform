<script>
    import "../../styles/login.css";
  import { login } from "../../store/store.js";

  let email = "";
  let password = "";
  let errorMessage = "";

  async function handleSubmit() {
    // Check if the username and password fields are not empty
    if (email.trim() === "" || password.trim() === "") {
      errorMessage = "Please enter your email and password.";
      return;
    }

    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      errorMessage = "Invalid email or password.";
      return;
    }

    const { accessToken, refreshToken } = await response.json();

    login(accessToken, refreshToken);

    location.href = '/';
  }

</script>

<div class="login">
  <div class="login-triangle" />
  <form
    class="login-container"
    on:submit|preventDefault={handleSubmit}
    method="POST">
    <ion-icon name="flower-outline" class="login__icon" />
    <label for="username">Username:</label>
    <input
      class="input-field"
      type="email"
      bind:value={email}
      placeholder="Email"
      required
    />
    <br>
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
    <br>
    <input id="submit-button" type="submit" value="Submit"/>
  </form>
</div>
