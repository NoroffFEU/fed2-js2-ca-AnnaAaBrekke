import { authGuard } from "../../utilities/authGuard.js";
import { hideLoader, showLoader } from "../../ui/global/loader.js";
import PostService from "../../api/post/postService.js";
import FormHandler from "../../ui/auth/formHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    console.log("Initialization started...");
    showLoader(); 
    authGuard();

    const postService = new PostService(); // Create an instance of PostService

    // Initialize form handling for creating posts and bind the createPost method
    FormHandler.initialize("#createPostForm", postService.createPost);
    console.log("FormHandler initialized successfully");

  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    hideLoader(); 
    console.log("Initialization finished.");
  }
});
