import { register } from "../../api/auth/register.js";
import FormHandler from "../../ui/auth/formHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  const formHandler = new FormHandler();
  FormHandler.initialize(
    "#registerForm",
    register 
  );
});
