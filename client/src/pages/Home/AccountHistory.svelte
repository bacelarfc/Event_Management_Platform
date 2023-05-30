<script>
    import "../../styles/adminpages.css";
    import Nav from "../../components/Nav.svelte";
    import { onMount } from "svelte";
    import "toastr/build/toastr.min.css";
    import toastr from "toastr";
    import { fetchOrdersByEmail } from "../../utils/orderAPI.js";
  

    let orders = [];
    let filteredOrders = [];
    let searchQuery = "";
  
    async function fetchData() {
      try {
        const userEmail = "1@1.com";
        orders = await fetchOrdersByEmail(userEmail);
        filteredOrders = [...orders]; // Copy all orders initially
      } catch (error) {
        toastr.error("Couldn't get resources");
        console.error("Error fetching data:", error);
      }
    }
  
    function handleSearch() {
      filteredOrders = orders.filter((order) => {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        const lowerCaseEventName = order.eventName.toLowerCase();
        const lowerCaseEmail = order.email.toLowerCase();
  
        return (
          lowerCaseEventName.startsWith(lowerCaseSearchQuery) ||
          lowerCaseEmail.startsWith(lowerCaseSearchQuery)
        );
      });
    }
  
    onMount(fetchData);
  </script>
  
  <Nav />
  
  <h1>Account History</h1>
  
  <div class="search-bar">
    <input
      type="text"
      bind:value={searchQuery}
      on:input={handleSearch}
      placeholder="Search by event name or email"
    />
  </div>
  
  <div class="table-container">
    {#if filteredOrders.length === 0}
      <p>No orders</p>
    {:else}
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredOrders as order}
            <tr>
              <td>{order.eventName}</td>
              <td>{order.email}</td>
              <td>{order.amount}</td>
              <td>{order.currency}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
  