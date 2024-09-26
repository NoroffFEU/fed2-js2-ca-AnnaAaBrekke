import { authGuard } from "../../utilities/authGuard.js";
import { hideLoader, showLoader } from "../../ui/global/loader.js";
import PostService from "../../api/post/PostService.js";
import FormHandler from "../../ui/auth/FormHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    showLoader();
    authGuard();

    const postService = new PostService(); // Create an instance of PostService

    FormHandler.initialize("#createPostForm", "createPost");
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    hideLoader();
  }
});
