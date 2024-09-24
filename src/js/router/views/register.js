import { register } from "../../api/auth/register.js";
import FormHandler from "../../ui/auth/formHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  FormHandler.initialize("#registerForm", (event, form) =>
    FormHandler.handleSubmit(event, form, register)
  );
});

