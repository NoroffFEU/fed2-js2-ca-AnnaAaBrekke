import { authGuard } from "../../utilities/authGuard.js"; // Ensure path is correct

document.addEventListener("DOMContentLoaded", () => {
  if (authGuard()) {
    window.location.href = "/profile/";
  }
});
