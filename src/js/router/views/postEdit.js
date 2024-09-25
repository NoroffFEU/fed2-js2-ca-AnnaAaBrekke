import { authGuard } from "../../utilities/authGuard.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { showLoader, hideLoader } from "../../ui/global/loader.js";
import FormHandler from "../../ui/auth/formHandler.js";
import PostService from "../../api/post/postService.js";
import { fetchAndPopulatePostData } from "../../ui/post/update.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    authGuard();
    showLoader();


    //MAYBE THIS POSTID REMOE

    const postId = new URLSearchParams(window.location.search).get("id");
    if (!postId) {
      console.error("No post ID found in the URL");
      return;
    }

    const postService = new PostService(); // Create an instance of PostService

    // Fetch the post data and populate the form (you may have a helper function for this)
    await fetchAndPopulatePostData(postId); // Fetch the data and fill the form

    // Initialize the form handling with the updatePost method
    FormHandler.initialize("#updatePostForm", postService.updatePost);
    console.log("FormHandler initialized successfully");

  } catch (error) {
    console.error("Error during page initialization:", error);
  } finally {
    hideLoader();
  }

  setLogoutListener(); // Ensure logout functionality works
});
