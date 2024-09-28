import { login } from "../../api/auth/login.js";
import FormHandler from "../../ui/auth/formHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  const formHandler = new FormHandler();
  FormHandler.initialize("#loginForm", login); // Pass the function, not a string
});

// document.addEventListener("DOMContentLoaded", () => {
//   const formHandler = new FormHandler();
//   FormHandler.initialize("#loginForm", (event, form) =>
//     formHandler.handleSubmit(event, form, login)
//   );
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const formHandler = new FormHandler();
//   FormHandler.initialize("#loginForm", "login");
// });
