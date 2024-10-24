import { loadPosts } from "../../ui/post/postLoader.js";
import { authGuard } from "../../utilities/authGuard.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";

document.addEventListener("DOMContentLoaded", async () => {
  if (authGuard()) {
    await loadPosts();
  } else {
    showErrorAlert("User not authenticated.");
  }
});
