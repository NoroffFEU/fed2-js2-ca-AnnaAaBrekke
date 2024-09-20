import { showErrorAlert } from "../ui/global/alertHandler.js";

export function authGuard() {
  if (!localStorage.getItem("token")) {
    showErrorAlert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}
