<script>
    import "../../styles/adminpages.css";
    import { onMount } from 'svelte';
    import { navigate } from "svelte-navigator";
    import "toastr/build/toastr.min.css";
    import toastr from "toastr";
  
    let userList = [];
  
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8080/users');
        const data = await response.json();
        userList = data; 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    async function deleteUser(email) {
    try {
      const response = await fetch('http://localhost:8080/users/' + email, {
        method: 'DELETE',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toastr.success("User was deleted");
        userList = userList.filter(user => user.email !== email);
      } else {
        toastr.error("Error deleting user");
        console.error('Error deleting user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  onMount(fetchData);
</script>

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
                <button class="edit-button" on:click={() => navigate(`/edit/${user.email}`)}>Edit</button>
                <button class="delete-button" on:click={() => deleteUser(user.email)}>Delete</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
  