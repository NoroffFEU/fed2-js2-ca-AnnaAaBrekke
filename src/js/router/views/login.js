import { login } from "../../api/auth/login.js";
import FormHandler from "../../ui/auth/formHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  FormHandler.initialize("#loginForm", (event, form) =>
    FormHandler.handleSubmit(event, form, login)
  );
});

