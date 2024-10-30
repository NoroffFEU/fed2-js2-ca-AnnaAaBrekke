import router from "./js/router/index.js";
import { setLogoutListener } from "./js/ui/global/logout.js";
import "./css/main.scss";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    let accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return;
    }
    await router();

    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
      setLogoutListener();
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});
