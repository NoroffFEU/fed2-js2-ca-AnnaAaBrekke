import { authGuard } from "../../utilities/authGuard.js";
import { hideLoader, showLoader } from "../../ui/global/loader.js";
import PostService from "../../api/post/postService.js";
import FormHandler from "../../ui/auth/formHandler.js";
import { loadNavbar } from "../../ui/global/navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    showLoader();
    authGuard();
    loadNavbar();

    const postService = new PostService();

    FormHandler.initialize("#createPostForm", "createPost");
  } catch (error) {
    throw new Error(`Error during initialization: ${error.message}`);
  } finally {
    hideLoader();
  }
});
