import { register } from "../../api/auth/register.js";
import FormHandler from "../../ui/auth/formHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  const formHandler = new FormHandler(); // Instantiate the FormHandler class
  FormHandler.initialize("#registerForm", (event, form) =>
    formHandler.handleSubmit(event, form, register) // Use the instance method
  );
});
