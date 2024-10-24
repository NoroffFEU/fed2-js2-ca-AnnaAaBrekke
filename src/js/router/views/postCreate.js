import { authGuard } from "../../utilities/authGuard.js";
import { hideLoader, showLoader } from "../../ui/global/loader.js";
import PostService from "../../api/post/postService.js";
import FormHandler from "../../ui/auth/formHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    showLoader();
    authGuard();

    const postService = new PostService();

    FormHandler.initialize("#createPostForm", "createPost");
  } catch (error) {
    throw new Error(`Error during initialization: ${error.message}`);
  } finally {
    hideLoader();
  }
});
