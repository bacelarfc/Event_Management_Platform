<script>
  import "../../styles/form.css";
  import { navigate } from "svelte-navigator";
  import { createEvent } from "../../utils/eventAPI";
  import "toastr/build/toastr.min.css";
  import toastr from "toastr";

  let name = "";
  let date = "";
  let time = "";
  let description = "";
  let location = "";
  let image = null;
  let ticket_max = 0;
  let ticket_left = 0;
  let price = 0;

  async function handleCreateEvent() {
  if (!name || !date || !time || !location || !description || !ticket_max || !ticket_left || !price) {
    toastr.error("Please fill in all required fields.");
    return;
  }

  if (ticket_max < ticket_left) {
    toastr.error("Max tickets can't be less than tickets left")
    return;
  }

  if (image) {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const uploadResponse = await fetch("http://localhost:8080/api/image/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        toastr.error("Failed to upload image");
        return;
      }

      const responseJson = await uploadResponse.json();
      const filename = responseJson.filename;

      const event = {
        name,
        date,
        time,
        location,
        description,
        image: filename ? filename : null,
        ticket_max,
        ticket_left,
        price,
      };

      await createEvent(event);
      toastr.success("Event was created");
      navigate("/manageEvents");
    } catch (error) {
      toastr.error("Error creating event");
    }
  } else {
    const event = {
      name,
      date,
      time,
      location,
      description,
      image: null,
      ticket_max,
      ticket_left,
      price,
    };

    try {
      await createEvent(event);
      toastr.success("Event was created");
      navigate("/manageEvents");
    } catch (error) {
      toastr.error("Error creating event");
    }
  }
}

  function goBack() {
    navigate("/manageEvents");
  }

  function handleImageUpload(event) {
    image = event.target.files[0];
  }
</script>

<h1>Create Event</h1>

<div class="form-container">
    <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" bind:value={name} required />
    </div>

    <div class="form-group">
        <label for="date">Date:</label>
        <input type="date" id="date" bind:value={date} required />
    </div>

    <div class="form-group">
        <label for="time">Time:</label>
        <input type="time" id="time" bind:value={time} required />
    </div>

    <div class="form-group">
        <label for="location">Location:</label>
        <input type="text" id="location" bind:value={location} required />
    </div>

    <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" bind:value={description} required />
    </div>

    <div class="form-group">
      <label for="image">Image:</label>
      <input type="file" accept="image/*" name="image" on:change="{handleImageUpload}" />
  </div>
  

    <div class="form-group">
        <label for="ticket_max">Max Tickets:</label>
        <input type="number" id="ticket_max" bind:value={ticket_max} required />
    </div>

    <div class="form-group">
        <label for="ticket_left">Tickets Left:</label>
        <input
            type="number"
            id="ticket_left"
            bind:value={ticket_left}
            required
        />
    </div>

    <div class="form-group">
        <label for="price">Price:</label>
        <input type="number" id="price" bind:value={price} required />
    </div>

    <div class="form-group">
        <button class="create-button" type="button" on:click={handleCreateEvent}>Create</button>
        <button class="back-button" type="button" on:click={goBack}>Back</button>
    </div>
</div>
