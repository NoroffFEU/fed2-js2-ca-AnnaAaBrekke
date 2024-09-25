import { login } from "../../api/auth/login.js";
import FormHandler from "../../ui/auth/formHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  const formHandler = new FormHandler(); // Instantiate the FormHandler class
  FormHandler.initialize("#loginForm", (event, form) =>
    formHandler.handleSubmit(event, form, login) // Use the instance method
  );
});
