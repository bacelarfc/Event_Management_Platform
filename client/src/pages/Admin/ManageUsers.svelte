<script>
  import "../../styles/adminpages.css";
  import "../../styles/eventur.css";
  import Nav from "../../components/Nav.svelte";
  import { onMount, onDestroy } from "svelte";
  import { navigate } from "svelte-navigator";
  import { io } from "socket.io-client";
  import "toastr/build/toastr.min.css";
  import toastr from "toastr";
  import { isAdmin } from "../../store/store";
  import { getUserFromToken } from "../../utils/auth.js";
  import {
    getUsers,
    deleteUser,
    updateUserAdminStatus,
  } from "../../utils/userAPI.js";

  let currentUserEmail = "";
  let userList = [];
  let filteredUsers = [];
  let searchQuery = "";
  let socket;

  async function fetchData() {
    try {
      userList = await getUsers();
      filteredUsers = [...userList];
    } catch (error) {
      toastr.error("Error loading users");
    }
  }

  async function handleUpdateAdminStatus(email) {
    try {
      const updatedUser = await updateUserAdminStatus(email);
      const index = userList.findIndex((user) => user.email === email);
      if (index !== -1) {
        userList[index] = updatedUser.user;
        filteredUsers[index] = updatedUser.user;
      }
      toastr.success("User admin status updated");
    } catch (error) {
      toastr.error("Error updating user admin status");
    }
  }

  async function handleDeleteUser(email) {
    try {
      await deleteUser(email);
      toastr.success("User was deleted");
      userList = userList.filter((user) => user.email !== email);
      filteredUsers = filteredUsers.filter((user) => user.email !== email);
    } catch (error) {
      toastr.error("Error deleting user");
    }
  }

  function handleSearch() {
    filteredUsers = userList.filter((user) => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      const lowerCaseEmail = user.email.toLowerCase();
      const lowerCaseFirstName = user.firstName.toLowerCase();
      const lowerCaseLastName = user.lastName.toLowerCase();

      return (
        lowerCaseEmail.startsWith(lowerCaseSearchQuery) ||
        lowerCaseFirstName.startsWith(lowerCaseSearchQuery) ||
        lowerCaseLastName.startsWith(lowerCaseSearchQuery)
      );
    });
  }

  onMount(async () => {
    try {
      const data = await getUserFromToken();
      currentUserEmail = data.email;

      fetchData();
    } catch (error) {
      toastr.error("Error loading logged in admin");
    }
  });

  socket = io("http://localhost:8080");

  socket.on("connect", () => {});

  socket.on("adminStatusChanged", async () => {
    const user = await getUserFromToken();
    isAdmin.set(user.isAdmin);
  });

  onDestroy(() => {
    if (socket) {
      socket.close();
    }
  });
</script>

<Nav />

<h1>User List</h1>

<div class="search-bar">
  <input
    type="text"
    bind:value={searchQuery}
    on:input={handleSearch}
    placeholder="Search by email, first name, or last name"
  />
</div>

<div class="table-container">
  <button class="create-button" on:click={() => navigate(`/userForm`)}
    >Add new User</button
  >
  <br />
  <br />
  {#if filteredUsers.length === 0}
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
        {#each filteredUsers as user}
          <tr>
            <td>{user.email}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.isAdmin}</td>
            <td>
              {#if user.email !== currentUserEmail}
                <button
                  class="edit-button"
                  on:click={() => handleUpdateAdminStatus(user.email)}
                  >Admin</button
                >
                <button
                  class="delete-button"
                  on:click={() => handleDeleteUser(user.email)}>Delete</button
                >
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
