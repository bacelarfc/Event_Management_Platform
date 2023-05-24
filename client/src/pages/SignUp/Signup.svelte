<script>
    import "../../styles/signUp.css";
    import { navigate } from "svelte-navigator";
    import "toastr/build/toastr.min.css";
    import toastr from "toastr";
    import { signUp } from "../../utils/auth.js";
  
    let email = "";
    let password = "";
    let confirmPassword = "";
    let firstName = "";
    let lastName = "";
  
    async function handleSignUp() {
      try {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
  
        const response = await signUp(email, password, firstName, lastName);
        toastr.success("Registered successfully");
        navigate("/login");
      } catch (error) {
        console.error(error.message);
        toastr.error("Registration failed: " + error.message);
        throw new Error("Registration failed: " + error.message);
      }
    }
  </script>
  
  <div class="register">
    <div class="register-triangle" />
    <form class="register-container" on:submit|preventDefault={handleSignUp}>
      <h3>Create your account</h3>
      <label for="firstName">First Name:</label>
      <input
        class="input-field"
        type="firstName"
        bind:value={firstName}
        placeholder="First Name"
        required
      />
      <label for="lastName">Last Name:</label>
      <input
        class="input-field"
        type="lastName"
        bind:value={lastName}
        placeholder="Last Name"
        required
      />
      <label for="email">Email:</label>
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
      <label for="confirm-password">Confirm Password:</label>
      <input
        class="input-field"
        type="password"
        bind:value={confirmPassword}
        placeholder="Confirm Password"
        required
      />
      <button class="log-in" type="button"
        ><a href="/login">Already a user? Log in!</a></button
      >
      <input id="submit-button" type="submit" value="Sign up"/>
    </form>
  </div>
  