import { register } from "../../api/auth/register.js";
import { login } from "../../api/auth/login.js";
import PostService from "../../api/post/postService.js";
import { showErrorAlert, showSuccessAlert } from "../global/alertHandler.js";
import { displayPost } from "../../router/views/posts.js";

export default class FormHandler {
  constructor() {
    this.postService = new PostService();
  }

  /**
   * Initialize form handler for a given form and action
   * @param {string} formId - The ID of the form to initialize
   * @param {function} action - The action to perform (e.g., createPost, updatePost, register, login)
   * @param {string} [postId=null] - Optional post ID for update operations
   */
  static initialize(formId, action, postId = null) {
    const form = document.querySelector(formId);
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const handler = new FormHandler();
        handler.handleSubmit(event, form, action, postId);
      });
    } else {
      console.error(`Form with ID ${formId} not found!`);
    }
  }

  /**
   * Convert form data to an object
   * @param {HTMLFormElement} form - The form element
   * @returns {object} - The form data as an object
   */
  static getFormData(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
  }

  /**
   * Validate form data based on action
   * @param {object} data - The form data to validate
   * @param {function} action - The action being performed (register, login, etc.)
   * @returns {string|null} - Error message if validation fails, or null if valid
   */
  static validateFormData(data, action) {
    if (!data || Object.keys(data).length === 0) {
      return "Form data is empty or invalid.";
    }

    // Additional validation for registration and login forms
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

    return null; // Return null if no validation errors
  }

  /**
   * Handle form submission
   * @param {Event} event - The form submit event
   * @param {HTMLFormElement} form - The form element
   * @param {function} action - The action to perform (createPost, updatePost, etc.)
   * @param {string|null} postId - The post ID if performing an update operation
   */
  async handleSubmit(event, form, action, postId = null) {
    const data = FormHandler.getFormData(form);
    const validationError = FormHandler.validateFormData(data, action);

    if (validationError) {
      showErrorAlert(validationError);
      return;
    }

    try {
      let result;
      console.log(`Attempting with data:`, data);

      // Handle post creation or update
      if (action === this.postService.updatePost && postId) {
        console.log("Updating post with ID:", postId);
        result = await this.postService.updatePost(postId, data);
        if (result && result.id) {
          showSuccessAlert(`Post updated successfully!`);
          // Ensure update is processed before redirection
          setTimeout(() => {
            window.location.href = `/post/?id=${result.id}`; // Updated to use result.id
          }, 1000);
        } else {
          showErrorAlert("Post update failed: Missing post ID.");
        }
      } else if (action === this.postService.createPost) {
        console.log("Creating a new post...");
        result = await this.postService.createPost(data);

        // Log the result to ensure it has the correct structure
        console.log("Post creation result:", result);

        // Correct condition to check for the post ID
        if (result && result.id) {
          showSuccessAlert("Post created successfully!");

          // Redirect after some delay to ensure the user sees the post displayed
          setTimeout(() => {
            window.location.href = `/post/?id=${result.id}`;
          }, 1500); // Adjust delay if necessary
          displayPost(result);
        } else {
          showErrorAlert(
            "Post creation successful, but unable to redirect due to missing post ID."
          );
          console.error("Post creation result is missing 'id':", result);
        }
      }
      // Handle registration or login
      else if (action === register || action === login) {
        result = await action(data);
        if (action === register) {
          showSuccessAlert("Registration successful! Redirecting to login...");
          window.location.href = "/auth/login/";
        } else if (action === login) {
          const responseData = result.data || result;
          if (responseData && responseData.accessToken) {
            localStorage.setItem("accessToken", responseData.accessToken);
            window.location.href = "/";
          } else {
            throw new Error("Access token not found in login response.");
          }
        }
      }

      form.reset(); // Reset the form after successful submission
    } catch (error) {
      showErrorAlert(`An error occurred: ${error.message}`);
      console.error("Error during form submission:", error);
    }
  }
}
