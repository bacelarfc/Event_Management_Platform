<script>
  import "../../styles/adminpages.css";
  import Nav from "../../components/Nav.svelte";
  import { onMount } from 'svelte';
  import { navigate } from "svelte-navigator";
  import "toastr/build/toastr.min.css";
  import toastr from "toastr";
  import { getUsers, deleteUser, updateUserAdminStatus } from "../../utils/userAPI.js";

  let userList = [];

  async function fetchData() {
    try {
      userList = await getUsers();
    } catch (error) {
      toastr.error("Couldn't get resources");
      console.error('Error fetching data:', error);
    }
  }

  async function handleUpdateAdminStatus(email) {
    try {
      const updatedUser = await updateUserAdminStatus(email);
      const index = userList.findIndex(user => user.email === email);
      if (index !== -1) {
        userList[index] = updatedUser.user; // Assuming the updated user object is returned in the "user" field
      }
      toastr.success("User admin status updated");
    } catch (error) {
      toastr.error("Error updating user admin status");
      console.error('Error updating user admin status:', error);
    }
  }

  async function handleDeleteUser(email) {
    try {
      await deleteUser(email);
      toastr.success("User was deleted");
      userList = userList.filter(user => user.email !== email);
    } catch (error) {
      toastr.error("Error deleting user");
      console.error('Error deleting user:', error);
    }
  }

  onMount(fetchData);
</script>


<Nav />

  <h1>User List</h1>
  

  <div class="table-container">
    <button class="create-button" on:click={() => navigate(`/userForm`)}>Add new User</button>

    {#if userList.length === 0}
      <p>No users</p>
    {:else}
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each userList as user}
          <tr>
            <td>{user.email}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.isAdmin}</td>
            <td>
              <button class="edit-button" on:click={() => handleUpdateAdminStatus(user.email)}>Admin</button>
              <button class="delete-button" on:click={() => handleDeleteUser(user.email)}>Delete</button>
            </td>
          </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
  