import { loadPosts } from "../../ui/post/postLoader.js";
import { authGuard } from "../../utilities/authGuard.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Wait for the access token and router initialization to complete
    await window.tokenReady;

    // After token is ready, check authentication and load posts
    if (authGuard()) {
      await loadPosts();
    } else {
      showErrorAlert("User not authenticated.");
    }
  } catch (error) {
    console.error("Error loading posts: ", error.message);
    showErrorAlert("Refresh page to get posts");
  }
});
