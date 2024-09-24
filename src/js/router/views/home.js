import { authGuard } from "../../utilities/authGuard.js";
import { displayPosts } from "./posts.js";
import { readPosts } from "../../api/post/read.js";
import { showLoader, hideLoader } from "../../ui/global/loader.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";

// Function to load posts from multiple users (for home page)
async function loadPosts() {
  try {
    showLoader();

    // Fetch posts from all users
    const posts = await readPosts({ limit: 12, page: 1 });
    console.log("Posts fetched:", posts); // Debugging log

    displayPosts(posts);
  } catch (error) {
    showErrorAlert("Error loading posts.");
    console.error("Error loading posts:", error.message);
  } finally {
    hideLoader();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  authGuard();
  loadPosts();
});
