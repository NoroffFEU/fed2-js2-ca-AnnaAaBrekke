import { authGuard } from "../../utilities/authGuard.js";
import { showLoader, hideLoader } from "../../ui/global/loader.js";

document.addEventListener("DOMContentLoaded", () => {
  showLoader();

  if (authGuard()) {
    window.location.href = "/profile/";
  }

  hideLoader();
});
