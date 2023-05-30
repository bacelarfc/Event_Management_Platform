<script>
  import "../../styles/adminpages.css";
  import Nav from "../../components/Nav.svelte";
  import { onMount } from "svelte";
  import "toastr/build/toastr.min.css";
  import toastr from "toastr";
  import { fetchOrdersByEmail } from "../../utils/orderAPI.js";
  import { getUserFromToken } from "../../utils/auth";

  let orders = [];
  let filteredOrders = [];

  async function fetchData() {
    try {
      const user = await getUserFromToken();
      orders = await fetchOrdersByEmail(user.email);
      filteredOrders = [...orders];
    } catch (error) {
      toastr.error("Couldn't get resources");
      console.error("Error fetching data:", error);
    }
  }

  onMount(fetchData);
</script>

<Nav />

<h1>Account History</h1>

<div class="table-container">
  {#if filteredOrders.length === 0}
    <p>No orders</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>Date of Order</th>
          <th>Event Name</th>
          <th>Email</th>
          <th>Amount</th>
          <th>Currency</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredOrders.slice().reverse() as order}
          <tr>
            <td>{order.orderDateTime}</td>
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
