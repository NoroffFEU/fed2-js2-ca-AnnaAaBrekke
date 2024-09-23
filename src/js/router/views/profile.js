import { authGuard } from "../../utilities/authGuard.js";
import { displayPosts } from "./posts.js";
import { readPostsByUser } from "../../api/post/read.js";
import { showLoader, hideLoader } from "../../ui/global/loader.js";
import { showError } from "../../ui/global/errorHandler.js";

authGuard();

// Function to load posts created by the logged-in user (for profile page)
export async function loadUserPosts() {
  try {
    showLoader();

    // Fetch posts created by the logged-in user
    const userPosts = await readPostsByUser({ limit: 12, page: 1 });
    console.log("User's posts fetched:", userPosts); // Debugging log

    // Display the user's posts
    displayPosts(userPosts);
  } catch (error) {
    showError("Error loading user's posts.");
    console.error("Error loading user's posts:", error.message);
  } finally {
    hideLoader();
  }
}

loadUserPosts();
