import FormHandler from "../../ui/auth/formHandler.js"; // Make sure this path is correct for FormHandler.js
import { createPost } from "../../api/post/create.js"; // Import createPost from its correct location
import { authGuard } from "../../utilities/authGuard.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { hideLoader, showLoader } from "../../ui/global/loader.js";

document.addEventListener("DOMContentLoaded", () => {
  showLoader();
  authGuard();
  setLogoutListener();
  // Initialize FormHandler for the createPost form
  FormHandler.initialize("#createPostForm", (event, form) =>
    FormHandler.handleSubmit(event, form, createPost)
  );
  hideLoader();
});

