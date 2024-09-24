import { register } from "../../api/auth/register.js";
import { login } from "../../api/auth/login.js";
import { createPost } from "../../api/post/create.js";
import { displayPost } from "../../router/views/posts.js";
import { updatePost } from "../../api/post/update.js";
import { showErrorAlert, showSuccessAlert } from "../global/alertHandler.js";

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

  static validateFormData(data, action) {
    if (!data || Object.keys(data).length === 0) {
      return "Form Data is empty or invalid";
    }

    if (action === register || action === login) {
      // The name value must not contain punctuation symbols apart from underscore (_) (in this space is not allowed ether and maybe should replace word to a-z - bit it is a shortcut?).
      const namePattern = /^[\w]+$/;
      if (data.name && !namePattern.test(data.name)) {
        return "Name must only contain letters, numbers, and underscores, without punctuation.";
      }

      // The email value must be a valid stud.noroff.no email address.
      const emailPattern = /^[\w]+@(stud\.)?noroff\.no$/;
      if (!data.email || !emailPattern.test(data.email)) {
        return "Email must be a valid stud.noroff.no address.";
      }

      // The password value must be at least 8 characters long.
      if (!data.password || data.password.length < 8) {
        return "Password must be at least 8 characters long.";
      }
    }

    return null;
  }

  static async handleSubmit(event, form, action, postId = null) {
    event.preventDefault();
    const data = FormHandler.getFormData(form);

    console.log("Form data:", data); // Log form data
    console.log(`Attempting to ${action.name} with data:`, data);

    const validationError = FormHandler.validateFormData(data, action);
    if (validationError) {
      showErrorAlert(validationError);
      return;
    }
    try {
      let result;
      if (action === updatePost && postId) {
        // Update post
        result = await action(postId, data);
        showSuccessAlert(`Post updated successfully!`);
        window.location.href = `/post/?id=${postId}`;
      } else {
        // Handle other actions like createPost, register, login
        result = await action(data);
      }

      console.log("Submission successful", result);

      // Handle results from different actions
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
      } else if (action === createPost) {
        showSuccessAlert("Post created successfully!");
        displayPost(result);
        window.location.href = `/post/?id=${result.id}`;
      }

      form.reset(); // Reset the form
    } catch (error) {
      showErrorAlert(`An error occurred: ${error.message}`);
      console.error("Error:", error);
    }
  }
}
