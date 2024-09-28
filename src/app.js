import { getKey } from "./js/api/auth/key.js";
import router from "./js/router/index.js"
import { setLogoutListener } from "./js/ui/global/logout.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Check if the user is logged in by checking for an access token
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      // User is logged in, generate and store the API key
      const apiKey = await getKey();
      console.log("API Key generated and stored:", apiKey);
    } else {
      console.log("User is not logged in. Skipping API key generation.");
    }

    // Initialize the router to handle the initial page load
    await router();

    // Check if the logout button exists in the DOM before setting the listener
    if (document.getElementById("logout-button")) {
      setLogoutListener(); // Initialize the logout button listener only if the button exists
    }
  } catch (error) {
    console.error("Error initializing application:", error.message);
  }
});
