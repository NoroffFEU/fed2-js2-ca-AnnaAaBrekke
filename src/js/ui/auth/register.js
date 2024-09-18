import { register } from "../../api/auth/register.js";
import { login } from "../../api/auth/login.js";
import { createPost } from "../../api/post/create.js";
import { displayPost } from "../../router/views/home.js";
import { updatePost } from "../../api/post/update.js";

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

  static async handleSubmit(event, form, action, postId = null) {
    event.preventDefault();
    const data = FormHandler.getFormData(form);

    if (!data || Object.keys(data).length === 0) {
      console.error("Form data is empty or invalid");
      return;
    }

    try {
      console.log(`Attempting to ${action.name} with data:`, data);

      let result;
      if (action === updatePost && postId) {
        // Pass the postId for updating the post
        result = await action(postId, data);
        alert(`Post with ID ${postId} updated successfully!`);

        // Redirect to the single post view after successful update
        window.location.href = `/post/?id=${postId}`;
      } else {
        // Handle other actions like createPost, register, login
        result = await action(data);
      }

      console.log("Submission successful", result);

      // Handle result based on action (e.g., register, login)
      if (action === register) {
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
        alert("Post created successfully!");
        displayPost(result); // Call displayPost to show the post on the homepage
        window.location.href = `/post/?id=${result.id}`; // Redirect to the single post view
      }

      form.reset(); // Reset the form after submission
    } catch (error) {
      alert("An error occurred: " + error.message);
      console.error("Error:", error.message);
    }
  }
}
