import { register } from "../../api/auth/register.js";
import { login } from "../../api/auth/login.js";
import { createPost } from "../../api/post/create.js";

export default class FormHandler {
  static initialize(formId, handler, action) {
    const form = document.querySelector(formId);
    if (form) {
      form.addEventListener("submit", (event) => handler(event, form, action));
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
      console.error("Form data is empty or invalid");
      return;
    }

    try {
      console.log(`Attempting to ${action.name} with data:`, data);

      // Check if the user is authenticated when creating a post
      if (action === createPost) {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          alert("You must be logged in to create a post.");
          window.location.href = "/auth/login/"; // Redirect to login
          return;
        }
      }

      const result = await action(data);
      console.log("Submission successful", result);

      // Handle result based on action
      if (action === register) {
        window.location.href = "/auth/login/";
      } else if (action === login) {
        // Login should return an accessToken
        const responseData = result.data || result;
        if (responseData && responseData.accessToken) {
          localStorage.setItem("accessToken", responseData.accessToken);
          window.location.href = "/";
        } else {
          throw new Error("Access token not found in login response data");
        }
      } else if (action === createPost) {
        alert("Post created successfully!");
        console.log("Post created", result);
        window.location.href = "/"; // Redirect to homepage after post creation
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
      console.error("Error:", error.message);
    }
  }
}
