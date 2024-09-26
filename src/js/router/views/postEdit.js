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
      console.error(
        "No post ID found in the URL. Redirecting to the homepage."
      );
      window.location.href = "/"; // Redirect to homepage if no postId
      return;
    }
    const postService = new PostService(); // Create an instance of PostService

    await fetchAndPopulatePostData(postId); // Fetch the data and fill the form

    FormHandler.initialize("#updatePostForm", "updatePost", postId);

  } catch (error) {
    console.error("Error during page initialization:", error);
  } finally {
    hideLoader();
  }
});
