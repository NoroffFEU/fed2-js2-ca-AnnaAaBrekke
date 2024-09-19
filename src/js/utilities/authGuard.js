import { showErrorAlert } from "../ui/global/alertHandler";

export function authGuard() {
  if (!localStorage.token) {
    showErrorAlert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  } else {
  }
}
