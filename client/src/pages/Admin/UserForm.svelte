<script>
    import "../../styles/form.css";
    import { navigate } from "svelte-navigator";
    import "toastr/build/toastr.min.css";
    import toastr from "toastr";

    let email = "";
    let password = "";
    let firstName = "";
    let lastName = "";
    let isAdmin = false;
    let errorMessage = "";

    function createUser() {
        if (!email || !password || !firstName || !lastName) {
            errorMessage = "Please fill in all required fields.";
            toastr.error("Please fill in all required fields.");
            return;
        }

        const user = {
            email,
            password,
            firstName,
            lastName,
            isAdmin,
        };

        fetch("http://localhost:8080/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (response.ok) {
                    toastr.success("User was created");
                    navigate("/manageUsers");
                } else if (response.status === 400) {
                    toastr.error("Email already in use");
                    return response.json();
                } else {
                    throw new Error("Error creating user");
                }
            })
            .then((data) => {
                if (data && data.message) {
                    errorMessage = data.message;
                    setTimeout(() => {
                        errorMessage = "";
                    }, 3000);
                }
            })
            .catch((error) => {
                console.error("Error creating user:", error);
            });
    }

    function goBack() {
        navigate("/manageUsers");
    }
</script>

<h1>Create User</h1>

<div class="form-container">

    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} required />
    </div>

    <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required />
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
        <button class="create-button" type="button" on:click={createUser}>Create</button>
        <button class="back-button" type="button" on:click={goBack}>Back</button>
    </div>
</div>
