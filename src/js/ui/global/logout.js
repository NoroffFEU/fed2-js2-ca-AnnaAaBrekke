import { onLogout } from "../auth/logout.js";

export function setLogoutListener() {
  const logoutBtn = document.getElementById("logout-button");
  if (logoutBtn) {
    console.log("Logout button found, adding event listener."); // Debugging line
    logoutBtn.addEventListener("click", () => {
      console.log("Logout button clicked."); // Debugging line
      onLogout();
    });
  } else {
    console.error("Logout button not found"); // Debugging line
  }
}
