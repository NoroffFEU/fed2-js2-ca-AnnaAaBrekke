import { authGuard } from "../../utilities/authGuard.js"; // Ensure the path is correct
import { showLoader, hideLoader } from "../../ui/global/loader.js"; // Import showLoader and hideLoader

document.addEventListener("DOMContentLoaded", () => {
  showLoader();

  // Perform the auth check
  if (authGuard()) {
    window.location.href = "/profile/";
  }

  hideLoader();
});
