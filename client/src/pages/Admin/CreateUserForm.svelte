<script>
    import "../../styles/form.css";
    import { navigate } from "svelte-navigator";
    import { createUser } from "../../utils/userAPI";
    import "toastr/build/toastr.min.css";
    import toastr from "toastr";
  
    let email = "";
    let password = "";
    let confirmPassword = "";
    let firstName = "";
    let lastName = "";
    let isAdmin = false;
    let errorMessage = "";
  
    async function handleCreateUser() {
      if (!email || !password || !confirmPassword || !firstName || !lastName) {
        errorMessage = "Please fill in all required fields.";
        toastr.error("Please fill in all required fields.");
        return;
      }
  
      const emailPattern = /^\S+@\S+\.\S+$/;
      if (!emailPattern.test(email)) {
        errorMessage = "Please enter a valid email address.";
        toastr.error("Please enter a valid email address.");
        return;
      }
  
      if (password !== confirmPassword) {
        errorMessage = "Passwords do not match.";
        toastr.error("Passwords do not match.");
        return;
      }
  
      const user = {
        email,
        password,
        firstName,
        lastName,
        isAdmin,
      };
  
      try {
        const response = await createUser(user);
        toastr.success("User was created");
        navigate("/manageUsers");
      } catch (error) {
        if (error.status === 400) {
          errorMessage = error.message;
          setTimeout(() => {
            errorMessage = "";
          }, 3000);
        } else {
          toastr.error("Email already in use");
          console.error("Error creating user:", error);
        }
      }
    }
  
    function goBack() {
      navigate("/manageUsers");
    }
  </script>
  
  <h1>Create User</h1>
  
  <div class="form-container">
    <div class="form-group">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        pattern="^\S+@\S+\.\S+$"
        required
      />
    </div>
  
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} required />
    </div>
  
    <div class="form-group">
      <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" bind:value={confirmPassword} required />
    </div>
  
    <div class="form-group">
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" bind:value={firstName} required />
    </div>
  
    <div class="form-group">
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" bind:value={lastName} required />
    </div>
  
    <div class="form-group">
      <label for="isAdmin">Admin:</label>
      <input type="checkbox" id="isAdmin" bind:checked={isAdmin} />
    </div>
  
    <div class="form-group">
      <button class="create-button" type="button" on:click={handleCreateUser}>Create</button>
      <button class="back-button" type="button" on:click={goBack}>Back</button>
    </div>
  </div>
  