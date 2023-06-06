<script>
  import "../../styles/form.css";
  import { navigate } from "svelte-navigator";
  import { getEventById, updateEvent } from "../../utils/eventAPI";
  import "toastr/build/toastr.min.css";
  import toastr from "toastr";

  let name = "";
  let date = "";
  let time = "";
  let description = "";
  let location = "";
  let image = "";
  let ticket_max = 0;
  let ticket_left = 0;
  let price = 0;

  function getEventIdFromUrl() {
    const urlParts = window.location.pathname.split("/");
    return urlParts[urlParts.length - 1];
  }

  const eventId = getEventIdFromUrl();

  async function fetchEventData() {
    try {
      const event = await getEventById(eventId);
      if (event) {
        ({ name, date, time, description, location, image, ticket_max, ticket_left, price } = event);
      } else {
        toastr.error("Event not found");
        navigate("/manageEvents");
      }
    } catch (error) {
      toastr.error("Error retrieving event data");
    }
  }

  async function handleUpdateEvent() {
    if (!name || !date || !time || !location || !description || !image || !ticket_max || !ticket_left || !price) {
      toastr.error("Please fill in all required fields.");
      return;
    }

    const event = {
      name,
      date,
      time,
      location,
      description,
      image,
      ticket_max,
      ticket_left,
      price,
    };

    try {
      let updatedImage = image; 

      if (typeof image === "object") {
        const uploadedImage = await uploadImage(image);
        updatedImage = uploadedImage ? uploadedImage.filename : image;
      }

      event.image = updatedImage;

      await updateEvent(eventId, event);
      toastr.success("Event updated");
      navigate("/manageEvents");
    } catch (error) {
      toastr.error("Error updating event");
    }
  }

  async function uploadImage(image) {

    const formData = new FormData();
    formData.append("image", image);

    try {
      const uploadResponse = await fetch("http://localhost:8080/image/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        toastr.error("Failed to upload image");
        console.error("Failed to upload image.");
        return null;
      }

      const responseJson = await uploadResponse.json();
      return responseJson;
    } catch (error) {
      toastr.error("Error uploading image");
      console.error("Error uploading image:", error);
      return null;
    }
  }

  function handleImageUpload(event) {
    image = event.target.files[0];
  }

  function goBack() {
    navigate("/manageEvents");
  }

  fetchEventData();
  
</script>
  <h1>Edit Event</h1>
  
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
      <textarea id="description" bind:value={description} required></textarea>
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
      <input type="number" id="ticket_left" bind:value={ticket_left} required />
    </div>
  
    <div class="form-group">
      <label for="price">Price:</label>
      <input type="number" id="price" bind:value={price} required />
    </div>
  
    <div class="form-group">
      <button class="create-button" type="button" on:click={handleUpdateEvent}>Update</button>
      <button class="back-button" type="button" on:click={goBack}>Back</button>
    </div>
  </div>
  