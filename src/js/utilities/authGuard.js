import { showErrorAlert } from "../ui/global/alertHandler.js";

/**
 * Checks if the user is authenticated by verifying if an access token is present in localStorage.
 * If no token is found, an error alert is shown, and the user is redirected to the login page.
 * 
 * @returns {boolean} - Returns true if the access token is found, otherwise false.
 */
export function authGuard() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    showErrorAlert("You must be logged in to view this page");

    setTimeout(() => {
      window.location.href = "/auth/login/";
    }, 2000);

    return false;
  }

  return true;
}
