// import { register } from "../../api/auth/register";
import { register } from "../../api/auth/register.js";

// export async function onRegister(event) {
//   // Prevent the form to not submit default
//   event.preventDefault();

//   // Get the form data/inputs
//   const form = event.target;
//   const name = form.elements
// }

export default class FormHandler {
  // Static form object for handling form operations
  static form = {
    // Handles the form submission and converts form data to an object
    handleSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);

      // Convert form data to an object
      const data = Object.fromEntries(formData.entries());
      console.log("Form Data (in handleSubmit):", data); // Log data here
      return data; // Ensure this line returns data
    },
  };

  // Event handlers for different form actions
  static events = {
    // Event handler for the registration form
    register: async (event) => {
      const data = FormHandler.form.handleSubmit(event);

      // Log the form data to the console
      console.log("Form Data (in register):", data);

      // Attempt to register the user
      try {
        const user = await register(data);
        // On success, redirect or show a success message
        console.log("Registration successful");
        // window.location.href = "/posts";
      } catch (error) {
        console.error("Registration error:", error.message);
      }
    },
  };
}

// login: async (event) => {
//   const data = FormHandler.form.handleSubmit(event)

//   try {
//     await API_AUTH.auth.
//   }
