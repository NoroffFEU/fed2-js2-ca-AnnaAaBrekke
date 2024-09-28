import { getKey } from "./js/api/auth/key.js";
import router from "./js/router/index.js";
import { setLogoutListener } from "./js/ui/global/logout.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      await getKey();
    }

    await router();

    if (document.getElementById("logout-button")) {
      setLogoutListener();
    }
  } catch (error) {
    throw new Error(`Error initializing application: ${error.message}`);
  }
});
