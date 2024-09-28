import { loadPosts } from "../../ui/post/postLoader.js";
import { authGuard } from "../../utilities/authGuard.js";

document.addEventListener("DOMContentLoaded", () => {
  if (authGuard()) {
    loadPosts();
  }
});
