import { loadPosts } from "../../ui/post/postLoader.js";
import { authGuard } from "../../utilities/authGuard.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";

window.tokenReady = async () => {
  try {
    if (authGuard()) {
      await loadPosts();
    } else {
      showErrorAlert("User not authenticated.");
    }
  } catch (error) {
    console.error("Error loading posts: ", error.message);
    showErrorAlert("Error loading posts.");
  }
};

window.tokenReady();
