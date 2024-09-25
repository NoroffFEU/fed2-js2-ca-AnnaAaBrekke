import { register } from "../../api/auth/register.js";
import { login } from "../../api/auth/login.js";
import PostService from "../../api/post/postService.js"; // Import PostService
import { displayPost } from "../../router/views/posts.js";
import { showErrorAlert, showSuccessAlert } from "../global/alertHandler.js";

export default class FormHandler {
  constructor() {
    this.postService = new PostService(); // Instantiate PostService class
  }

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

  static validateFormData(data, action) {
    if (!data || Object.keys(data).length === 0) {
      return "Form Data is empty or invalid";
    }

    // Validation logic for register or login forms
    if (action === register || action === login) {
      const namePattern = /^[\w]+$/;
      if (data.name && !namePattern.test(data.name)) {
        return "Name must only contain letters, numbers, and underscores, without punctuation.";
      }

      const emailPattern = /^[\w]+@(stud\.)?noroff\.no$/;
      if (!data.email || !emailPattern.test(data.email)) {
        return "Email must be a valid stud.noroff.no address.";
      }

      if (!data.password || data.password.length < 8) {
        return "Password must be at least 8 characters long.";
      }
    }

    return null;
  }

  async handleSubmit(event, form, action, postId = null) {
    event.preventDefault();
    const data = FormHandler.getFormData(form);
    const postService = this.postService; // Use the instantiated PostService

    console.log("Form data:", data);
    console.log(`Attempting to ${action.name} with data:`, data);

    const validationError = FormHandler.validateFormData(data, action);
    if (validationError) {
      showErrorAlert(validationError);
      return;
    }

    try {
      let result;
      console.log("Attempting to create or update a post...");

      // Check if it's an update operation
      if (action === this.postService.updatePost && postId) {
        console.log("Updating post with ID:", postId);
        result = await this.postService.updatePost(postId, data);
        showSuccessAlert(`Post updated successfully!`);
        window.location.href = `/post/?id=${postId}`;
      }
      // Create new post
      else if (action === this.postService.createPost) {
        console.log("Creating a new post..."); // Log the create operation
        result = await this.postService.createPost(data);
        showSuccessAlert("Post created successfully!");
        displayPost(result);
        window.location.href = `/post/?id=${result.id}`;
      }
      // Handle registration and login
      else if (action === register || action === login) {
        result = await action(data); // For register and login actions
        if (action === register) {
          showSuccessAlert("Registration successful! Redirecting to login...");
          window.location.href = "/auth/login/";
        } else if (action === login) {
          const responseData = result.data || result;
          if (responseData && responseData.accessToken) {
            localStorage.setItem("accessToken", responseData.accessToken);
            window.location.href = "/";
          } else {
            throw new Error("Access token not found in login response data");
          }
        }
      }

      form.reset(); // Reset the form after submission
    } catch (error) {
      showErrorAlert(`An error occurred: ${error.message}`);
      console.error("Error:", error);
    }
  }
}
