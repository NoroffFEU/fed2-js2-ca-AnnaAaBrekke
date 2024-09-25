import { onLogout } from "../auth/logout.js";

export function setLogoutListener() {
  const logoutBtn = document.getElementById("logout-button");
  if (logoutBtn) {
    console.log("Logout button found, adding event listener."); 
    logoutBtn.addEventListener("click", () => {
      console.log("Logout button clicked."); 
      onLogout();
    });
  } else {
    console.error("Logout button not found"); 
  }
}
