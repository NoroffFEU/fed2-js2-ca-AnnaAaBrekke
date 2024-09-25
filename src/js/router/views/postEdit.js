// import { authGuard } from "../../utilities/authGuard.js";
// import { readPost } from "../../api/post/read.js";
// import { updatePost } from "../../api/post/update.js";
// import FormHandler from "../../ui/auth/formHandler.js";
// import { setLogoutListener } from "../../ui/global/logout.js";
// import { showErrorAlert } from "../../ui/global/alertHandler.js";
// import { hideLoader, showLoader } from "../../ui/global/loader.js";

// authGuard();

// export default class UpdatePostFormHandler {
//   static initialize(formId, postId) {
//     const form = document.querySelector(formId);
//     if (!form) {
//       console.error(`Form with ID ${formId} not found!`);
//       return;
//     }

//     FormHandler.initialize(
//       formId,
//       (event) => {
//         FormHandler.handleSubmit(event, form, updatePost, postId); // Pass postId for updating post
//       },
//       updatePost
//     );
//   }
// }

// function getQueryParam(name) {
//   const urlParams = new URLSearchParams(window.location.search);
//   return urlParams.get(name);
// }

// async function loadPostData() {
//   const postId = getQueryParam("id"); // Get the post ID from the URL

//   if (!postId) {
//     console.error("No post ID found in the URL");
//     return;
//   }

//   try {
//     const post = await readPost(postId);

//     // Populate the form fields with the fetched content data (post)
//     document.getElementById("title").value = post.title;
//     document.getElementById("body").value = post.body;

//     if (Array.isArray(post.tags) && post.tags.length > 0) {
//       document.getElementById("tags").value = post.tags.join(", ");
//     } else {
//       document.getElementById("tags").value = ""; // Clear if no tags
//     }

//     // Form handler shoudl submit the updated post
//     UpdatePostFormHandler.initialize("#updatePostForm", postId);
//   } catch (error) {
//     showErrorAlert("Error fetching the post data to update");
//     console.error("Error fetching the post data to udate", error);
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   showLoader();
//   loadPostData();
//   setLogoutListener();
//   hideLoader();
// });


import { authGuard } from "../../utilities/authGuard.js";
import PostService from "../../api/post/postService.js";
import { onUpdatePost } from "../../ui/post/update.js";
// import FormHandler from "../../ui/auth/formHandler.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { hideLoader, showLoader } from "../../ui/global/loader.js";

const postService = new PostService(); // Create an instance of PostService

authGuard();

export default class UpdatePostFormHandler {
  static initialize(formId, postId) {
    const form = document.querySelector(formId);
    if (!form) {
      console.error(`Form with ID ${formId} not found!`);
      return;
    }

    // Bind the update form submission to onUpdatePost function
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      onUpdatePost(event, postId); // Pass postId for updating the post
    });
  }
}

// Function to get query parameters from the URL
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Function to load the post data and populate the form
async function loadPostData() {
  const postId = getQueryParam("id"); // Get the post ID from the URL

  if (!postId) {
    console.error("No post ID found in the URL");
    return;
  }

  try {
    showLoader(); // Show loading spinner while data is being fetched

    const post = await postService.fetchPosts({ id: postId }); // Fetch the post using PostService

    if (post) {
      // Populate the form fields with the fetched post data
      document.getElementById("title").value = post.title || "";
      document.getElementById("body").value = post.body || "";

      if (Array.isArray(post.tags) && post.tags.length > 0) {
        document.getElementById("tags").value = post.tags.join(", ");
      } else {
        document.getElementById("tags").value = ""; // Clear if no tags
      }

      // Initialize the form handler for updating the post
      UpdatePostFormHandler.initialize("#updatePostForm", postId);
    } else {
      showErrorAlert("No post found to populate the form.");
    }
  } catch (error) {
    showErrorAlert("Error fetching the post data to update.");
    console.error("Error fetching the post data to update:", error);
  } finally {
    hideLoader(); // Hide the loading spinner
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showLoader();
  loadPostData(); // Load the post data when the page is loaded
  setLogoutListener(); // Ensure the logout functionality works
  hideLoader();
});
