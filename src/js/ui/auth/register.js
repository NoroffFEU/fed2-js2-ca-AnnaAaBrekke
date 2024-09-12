import { register } from "../../api/auth/register.js";

export default class FormHandler {
  static initialize(formId, handler) {
    const form = document.querySelector(formId);
    if (form) {
      form.addEventListener('submit', (event) => handler(event, form));
    } else {
      console.error(`Form with ID ${formId} not found!`);
    }
  }

  static getFormData(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
  }

  static async handleSubmit(event, form, action) {
    event.preventDefault();
    const data = FormHandler.getFormData(form);

    if (!data || Object.keys(data).length === 0) {
      console.warn("Form data is empty or invalid");
      return;
    }

    try {
      console.log(`Attempting to ${action} with data:`, data);
      await action(data);
      window.location.href = "/auth/login/";
    } catch (error) {
      alert(error.message);
      console.error(error.message);
    }
  }
}

// Usage example for registration
document.addEventListener("DOMContentLoaded", () => {
  FormHandler.initialize('#registerForm', (event, form) => FormHandler.handleSubmit(event, form, register));
});

// If you have another form, e.g., for login, use it similarly
// FormHandler.initialize('#loginForm', (event, form) => FormHandler.handleSubmit(event, form, login));
