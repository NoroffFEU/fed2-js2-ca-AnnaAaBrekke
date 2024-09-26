import PostService from "../../api/post/PostService.js";
import { showErrorAlert } from "../global/alertHandler.js";

const postService = new PostService(); // Create an instance of PostService

export async function fetchAndPopulatePostData(postId) {
  try {
    const post = await postService.fetchPosts({ id: postId });

    if (post) {
      document.getElementById("title").value = post.title || "";
      document.getElementById("body").value = post.body || "";

      const tagsField = document.getElementById("tags");
      tagsField.value =
        post.tags && Array.isArray(post.tags) ? post.tags.join(", ") : ""; // Populate tags or clear if none
    } else {
      showErrorAlert("No post found to populate the form.");
    }
  } catch (error) {
    showErrorAlert("Error fetching the post data.");
    console.error("Error fetching the post data:", error);
  }
}

// import PostService from "../../api/post/postService.js";
// import { showSuccessAlert, showErrorAlert } from "../global/alertHandler.js";
// import { showLoader, hideLoader } from "../../ui/global/loader.js";

// const postService = new PostService(); // Create an instance of PostService

// // Function to handle form submission for updating the post
// export function initializeUpdateForm(postId) {
//   const form = document.querySelector("#updatePostForm");
//   if (!form) {
//     console.error("Update form not found!");
//     return;
//   }

//   form.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     await onUpdatePost(event, postId);
//   });
// }

// // Function to update the post on form submission
// export async function onUpdatePost(event, postId) {
//   event.preventDefault();

//   try {
//     showLoader();
//     const formData = new FormData(event.target);
//     const title = formData.get("title");
//     const body = formData.get("body");
//     const tags = formData.get("tags");

//     const updatedPost = { title, body, tags };

//     await postService.updatePost(postId, updatedPost); // Use updatePost method from PostService

//     showSuccessAlert(`Post with title "${title}" updated successfully!`);

//     setTimeout(() => {
//       window.location.href = `/post/?id=${postId}`;
//     }, 1000);
//   } catch (error) {
//     showErrorAlert(`Failed to update post with ID ${postId}: ${error.message}`);
//     console.error(`Failed to update post with ID ${postId}:`, error);
//   } finally {
//     hideLoader();
//   }
// }

// // Function to fetch post data and populate the form
// export async function fetchAndPopulatePostData(postId) {
//   try {
//     const post = await postService.fetchPosts({ id: postId }); // Fetch post data by ID

//     if (post) {
//       document.getElementById("title").value = post.title || "";
//       document.getElementById("body").value = post.body || "";

//       const tagsField = document.getElementById("tags");
//       tagsField.value = (post.tags && Array.isArray(post.tags)) ? post.tags.join(", ") : ""; // Populate tags or clear if none
//     } else {
//       showErrorAlert("No post found to populate the form.");
//     }
//   } catch (error) {
//     showErrorAlert("Error fetching the post data.");
//     console.error("Error fetching the post data:", error);
//   }
// }
