// import "/src/css/style.css"; to many issues in live server

import { getKey } from "./js/api/auth/key.js";
import router from "./js/router/index.js";
import { setLogoutListener } from "./js/ui/global/logout.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const apiKey = await getKey(); // Create and store the API key
    console.log("API Key generated and stored:", apiKey);

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
