import { register } from "../../api/auth/register.js";
import FormHandler from "../../ui/auth/FormHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  const formHandler = new FormHandler();
  FormHandler.initialize(
    "#registerForm",
    (event, form) => formHandler.handleSubmit(event, form, register) // Use the instance method
  );
});
