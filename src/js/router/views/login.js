import { login } from "../../api/auth/login.js";
import FormHandler from "../../ui/auth/formHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  FormHandler.initialize("#loginForm", (event, form) =>
    FormHandler.handleSubmit(event, form, login)
  );
});

// import { onLogin } from "../../ui/auth/login";

// const form = document.forms.login;

// form.addEventListener("submit", onLogin);
