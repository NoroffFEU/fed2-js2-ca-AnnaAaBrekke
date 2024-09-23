import { showErrorAlert } from "../ui/global/alertHandler.js";

export function authGuard() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    showErrorAlert("You must be logged in to view this page");

    // Delay the redirection by 3 seconds (3000 milliseconds)
    setTimeout(() => {
      window.location.href = "/auth/login/";
    }, 2000);

    return false; // Indicate that the token was not found
  }

  return true; // Indicate that the token was found
}
