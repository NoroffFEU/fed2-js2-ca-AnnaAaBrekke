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
   * Initialize form handler for a given form and action.
   *
   * @param {string} formId - The ID of the form to initialize.
   * @param {function} action - The action to perform (e.g., createPost, updatePost, register, login).
   * @param {string} [postId=null] - Optional post ID for update operations.
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
      throw new Error(`Form with ID ${formId} not found!`);
    }
  }

  /**
   * Convert form data to an object.
   *
   * @param {HTMLFormElement} form - The form element.
   * @returns {Object} - The form data as an object.
   */
  static getFormData(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Optionally add avatar if present
    const avatarUrl = formData.get("avatar");
    const avatarAlt = formData.get("avatarAlt");
    if (avatarUrl && avatarAlt) {
      data.avatar = {
        url: avatarUrl,
        alt: avatarAlt,
      };
    }

    // Optionally add banner if present
    const bannerUrl = formData.get("banner");
    const bannerAlt = formData.get("bannerAlt");
    if (bannerUrl && bannerAlt) {
      data.banner = {
        url: bannerUrl,
        alt: bannerAlt,
      };
    }

    return data;
  }

  /**
   * Validate form data based on the action.
   *
   * @param {Object} data - The form data to validate.
   * @param {function} action - The action being performed (register, login, etc.).
   * @returns {string|null} - Error message if validation fails, or null if valid.
   */
  static validateFormData(data, action) {
    if (!data || Object.keys(data).length === 0) {
      return "Form data is empty or invalid.";
    }

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

      // Validate avatar if provided
      if (data.avatar && (!data.avatar.url || !data.avatar.alt)) {
        return "Both avatar URL and alt text are required if avatar is provided.";
      }

      // Validate banner if provided
      if (data.banner && (!data.banner.url || !data.banner.alt)) {
        return "Both banner URL and alt text are required if banner is provided.";
      }
    }

    return null;
  }

  /**
   * Handle form submission, validating the form and performing the requested action.
   *
   * @param {Event} event - The form submit event.
   * @param {HTMLFormElement} form - The form element.
   * @param {function} action - The action to perform (createPost, updatePost, etc.).
   * @param {string|null} postId - The post ID if performing an update operation.
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

      form
        .querySelectorAll("input, textarea, button")
        .forEach((el) => (el.disabled = true));

      if (action === "updatePost" && postId) {
        result = await this.postService.updatePost(postId, data);
        if (result && result.id) {
          showSuccessAlert(`Post updated successfully!`);
          setTimeout(() => {
            window.location.href = `/post/?id=${result.id}`;
          }, 1000);
        } else {
          showErrorAlert("Post update failed: Missing post ID.");
        }
      } else if (action === "createPost") {
        result = await this.postService.createPost(data);
        if (result && result.id) {
          showSuccessAlert("Post created successfully!");
          setTimeout(() => {
            window.location.href = `/post/?id=${result.id}`;
          }, 1000);
          displayPost(result);
        } else {
          showErrorAlert(
            "Post creation successful, but unable to redirect due to missing post ID.",
          );
        }
      } else if (action === register || action === login) {
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

      form.reset();
    } catch (error) {
      showErrorAlert(`An error occurred: ${error.message}`);
      throw new Error(`Error during form submission: ${error.message}`);
    }
  }
}
