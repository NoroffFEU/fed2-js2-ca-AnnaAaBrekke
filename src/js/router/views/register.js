
import { register } from "../../api/auth/register.js";
import FormHandler from "../../ui/auth/register.js";

document.addEventListener("DOMContentLoaded", () => {
  FormHandler.initialize("#registerForm", (event, form) =>
    FormHandler.handleSubmit(event, form, register)
  );
});

// import FormHandler from "../../ui/auth/register";

// document.addEventListener("DOMContentLoaded", () => {
//   FormHandler.initialize();
// })

// // import FormHandler from "../../ui/auth/register";

// // const form = document.forms.register;

// // form.addEventListener("submit", FormHandler);

// // // it wad onRegister funciton - i changes it

// // Usage example for registration
// document.addEventListener("DOMContentLoaded", () => {
//   FormHandler.initialize('#registerForm', (event, form) => FormHandler.handleSubmit(event, form, register));
//   FormHandler.initialize('#loginForm', (event, form) => FormHandler.handleSubmit(event, form, login));
// });
