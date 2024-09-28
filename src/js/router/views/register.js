import { register } from "../../api/auth/register.js";
import FormHandler from "../../ui/auth/FormHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  const formHandler = new FormHandler();
  FormHandler.initialize(
    "#registerForm",
    register // Directly pass the register function
  );
});
