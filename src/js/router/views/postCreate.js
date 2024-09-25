import FormHandler from "../../ui/auth/formHandler.js"; // Ensure the path is correct
import PostService from "../../api/post/postService.js";
import { authGuard } from "../../utilities/authGuard.js";
import { hideLoader, showLoader } from "../../ui/global/loader.js";
import { onCreatePost } from "../../ui/post/create.js";


document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded"); // Ensure that the script is running
  showLoader();
  authGuard();
  onCreatePost();
  hideLoader();
});
