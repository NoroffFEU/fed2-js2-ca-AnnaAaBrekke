import { loadPosts } from "../../ui/post/postLoader.js";
import { authGuard } from "../../utilities/authGuard.js";

document.addEventListener("DOMContentLoaded", () => {
  if (authGuard()) {
    // If authenticated, load the posts
    loadPosts();
  } else {
    console.log("User is not authenticated. Redirecting to login...");
  }
});
