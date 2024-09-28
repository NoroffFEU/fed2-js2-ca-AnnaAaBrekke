import PostService from "../../api/post/postService.js";
import { authGuard } from "../../utilities/authGuard.js";
import { displayPosts } from "./posts.js";
import { showLoader, hideLoader } from "../../ui/global/loader.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";

authGuard();

const postService = new PostService();

// Function to load posts created by the logged-in user (for profile page)
export async function loadUserPosts() {
  try {
    showLoader();

    const userPosts = await postService.readPostsByUser({ limit: 12, page: 1 });
    console.log("User's posts fetched:", userPosts);

    // Display the user's posts
    displayPosts(userPosts);
  } catch (error) {
    showErrorAlert("Error loading user's posts.");
    console.error("Error loading user's posts:", error.message);
  } finally {
    hideLoader();
  }
}

loadUserPosts();
