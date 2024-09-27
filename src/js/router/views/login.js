import { login } from "../../api/auth/login.js";
import FormHandler from "../../ui/auth/FormHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  const formHandler = new FormHandler();
  FormHandler.initialize("#loginForm", (event, form) =>
    formHandler.handleSubmit(event, form, login)
  );
});

// document.addEventListener("DOMContentLoaded", () => {
//   const formHandler = new FormHandler();
//   FormHandler.initialize("#loginForm", "login");
// });
