<script>
  import "../../styles/form.css";
  import { navigate } from "svelte-navigator";
  import { onMount } from "svelte";
  import { updateUser } from "../../utils/userAPI";
  import { login, getUserFromToken } from "../../utils/auth.js";
  import Nav from "../../components/Nav.svelte";
  import "toastr/build/toastr.min.css";
  import toastr from "toastr";

  let email = "";
  let password = "";
  let confirmPassword = "";
  let newPassword = "";
  let firstName = "";
  let lastName = "";
  let isAdmin = false;
  let errorMessage = "";

  onMount(async () => {
    try {
      const data = await getUserFromToken();
      email = data.email;
      firstName = data.firstName;
      lastName = data.lastName;
      isAdmin = data.isAdmin;
    } catch (error) {
      console.error("Error:", error);
    }
  });

  async function handleUpdateUser() {
    if (!password || !confirmPassword || !newPassword) {
      errorMessage = "Please fill in all password fields.";
      toastr.error("Please fill in all password fields.");
      return;
    }

    if (password !== confirmPassword) {
      errorMessage = "Passwords do not match.";
      toastr.error("Passwords do not match.");
      return;
    }

    if (password === newPassword) {
      errorMessage = "New password cannot be the same as the old password.";
      toastr.error("New password cannot be the same as the old password.");
      return;
    }

    try {
      await login(email, password);
    } catch (error) {
      toastr.error("Incorrect password for user: " + email);
      console.error("Error updating user:", error);
      return;
    }

    const updatedUser = {
      email,
      password,
      firstName,
      lastName,
      isAdmin,
    };

    updatedUser.password = newPassword;

    try {
      await updateUser(email, updatedUser);
      toastr.success("User was updated");
      navigate("/home");
    } catch (error) {
      toastr.error("Error updating user");
      console.error("Error updating user:", error);
    }
  }

  function goBack() {
    navigate("/");
  }
</script>

<Nav />

<h1>User Settings</h1>

<div class="form-container">
  <div class="form-group">
    <label for="Email">Email:</label>
    <p>{email}</p>
  </div>

  <div class="form-group">
    <label for="Name">Name:</label>
    <p>{firstName} {lastName}</p>
  </div>

  <h2>Change password</h2>

  <div class="form-group">
    <label for="password">Current Password:</label>
    <input type="password" id="password" bind:value={password} required />
  </div>

  <div class="form-group">
    <label for="confirmPassword">Confirm Password:</label>
    <input
      type="password"
      id="confirmPassword"
      bind:value={confirmPassword}
      required
    />
  </div>

  <div class="form-group">
    <label for="newPassword">New Password:</label>
    <input type="password" id="newPassword" bind:value={newPassword} required />
  </div>

  <div class="form-group">
    <button class="create-button" type="button" on:click={handleUpdateUser}
      >Update</button
    >
    <button class="back-button" type="button" on:click={goBack}>Back</button>
  </div>
</div>
