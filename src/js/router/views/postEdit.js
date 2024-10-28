import { authGuard } from "../../utilities/authGuard.js";
import { showLoader, hideLoader } from "../../ui/global/loader.js";
import FormHandler from "../../ui/auth/formHandler.js";
import PostService from "../../api/post/postService.js";
import { fetchAndPopulatePostData } from "../../ui/post/update.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    authGuard();
    showLoader();

    const postId = new URLSearchParams(window.location.search).get("id");
    if (!postId) {
      window.location.href = "/";
      return;
    }

    const postService = new PostService();

    await fetchAndPopulatePostData(postId);

    FormHandler.initialize("#updatePostForm", "updatePost", postId);
  } catch (error) {
    throw new Error(`Error during page initialization: ${error.message}`);
  } finally {
    hideLoader();
  }
});
