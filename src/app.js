import { getKey } from "./js/api/auth/key.js";
import router from "./js/router/index.js";
import { setLogoutListener } from "./js/ui/global/logout.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    let accessToken = localStorage.getItem("accessToken");

    // If no access token, try to create/generate a new API key
    if (!accessToken) {
      console.log("Access token not found, attempting to create API key...");
      // Attempt to generate or retrieve an API key
      await getKey();

      // After generating the API key, try to retrieve the access token again
      accessToken = localStorage.getItem("accessToken");

      // If still no accessToken, handle the case where key creation fails
      if (!accessToken) {
        throw new Error("Failed to create access token. Please log in.");
      }
    } else {
      // If access token is found, retrieve or verify the API key
      await getKey();
    }

    // Initialize the router
    await router();

    // Setup logout listener if the logout button exists
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
      setLogoutListener();
    }
  } catch (error) {
    console.error(`Error initializing application: ${error.message}`);
    // Optionally, display error in the UI
    const errorContainer = document.getElementById("error-container");
    if (errorContainer) {
      errorContainer.textContent = `Error: ${error.message}`;
    }
  }
});
