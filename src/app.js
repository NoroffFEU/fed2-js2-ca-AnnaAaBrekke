import { getKey } from "./js/api/auth/key.js";
import router from "./js/router/index.js";
import { showErrorAlert } from "./js/ui/global/alertHandler.js";
import { setLogoutListener } from "./js/ui/global/logout.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    let accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.log("Access token not found, attempting to create API key...");
      await getKey();

      accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Failed to create access token. Please log in.");
      }
    } else {
      await getKey();
    }

    await router();

    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
      setLogoutListener();
    }
  } catch (error) {
    showErrorAlert(`Error: ${error.message}`);
  }
});
