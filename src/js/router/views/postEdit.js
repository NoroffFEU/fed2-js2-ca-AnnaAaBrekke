import { authGuard } from "../../utilities/authGuard";
import { readPost } from "../../api/post/read.js";
import { updatePost } from "../../api/post/update.js";
import FormHandler from "../../ui/auth/register.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { showError } from "../../ui/global/errorHandler.js";
import { hideLoader, showLoader } from "../../ui/global/loader.js";

authGuard();

export default class UpdatePostFormHandler {
  static initialize(formId, postId) {
    const form = document.querySelector(formId);
    if (!form) {
      console.error(`Form with ID ${formId} not found!`);
      return;
    }

    FormHandler.initialize(
      formId,
      (event) => {
        FormHandler.handleSubmit(event, form, updatePost, postId); // Pass postId for updating post
      },
      updatePost
    );
  }
}

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

async function loadPostData() {
  const postId = getQueryParam("id"); // Get the post ID from the URL

  if (!postId) {
    console.error("No post ID found in the URL");
    return;
  }

  try {
    const post = await readPost(postId);

    // Populate the form fields with the fetched content data (post)
    document.getElementById("title").value = post.title;
    document.getElementById("body").value = post.body;

    if (Array.isArray(post.tags) && post.tags.length > 0) {
      document.getElementById("tags").value = post.tags.join(", ");
    } else {
      document.getElementById("tags").value = ""; // Clear if no tags
    }

    document.getElementById("media-url").value = post.media?.url || "";
    document.getElementById("media-alt").value = post.media?.alt || "";

    // Form handler shoudl submit the updated post
    UpdatePostFormHandler.initialize("#updatePostForm", postId);
  } catch (error) {
    showError("Error fetching the post data to update");
    console.error("Error fetching the post data to udate", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showLoader();
  loadPostData();
  setLogoutListener();
  hideLoader();
});
