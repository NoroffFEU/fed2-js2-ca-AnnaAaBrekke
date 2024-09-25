// import { deletePost } from "../../api/post/delete.js";
// import { showSuccessAlert, showErrorAlert } from "../global/alertHandler.js";

// export async function onDeletePost(event) {
//   event.preventDefault();

//   const postId = event.target.getAttribute("data-id");

//   if (!postId) {
//     console.error("No post ID is found");
//     return;
//   }

//   if (!confirm(`Are you sure you want to delete the post with ID ${postId}?`)) {
//     return; // Exit if the user does not confirm
//   }

//   try {
//     await deletePost(postId); // Delete from the API

//     // Remove the post from localStorage (createdPosts)
//     const storedPosts = JSON.parse(localStorage.getItem("createdPosts")) || [];
//     const remainingPostsList = storedPosts.filter(
//       (post) => post.id !== parseInt(postId)
//     );
//     localStorage.setItem("createdPosts", JSON.stringify(remainingPostsList));

//     showSuccessAlert(`Post deleted successfully`);

//     // Wait 500ms before redirecting
//     setTimeout(() => {
//       window.location.href = "/profile/";
//     }, 1000);
//   } catch (error) {
//     showErrorAlert(`Failed to delete post id ${postId}`);
//     console.error(`Failed to delete post with id ${postId}`, error);
//   }
// }

import PostService from "../../api/post/postService.js";
import { showSuccessAlert, showErrorAlert } from "../global/alertHandler.js";

const postService = new PostService(); // Create an instance of PostService

export async function onDeletePost(event) {
  // Ensure the event target is correct
  const postId = event.target.getAttribute("data-id");

  if (!postId) {
    console.error("No post ID found in the button's data-id attribute");
    return;
  }

  // Confirm the deletion action
  if (!confirm(`Are you sure you want to delete the post with ID ${postId}?`)) {
    return; // Exit if the user does not confirm
  }

  try {
    // Call the deletePost method from PostService
    await postService.deletePost(postId);

    // Show success alert and redirect to homepage
    showSuccessAlert(`Post with id ${postId} has been deleted successfully!`);
    window.location.href = "/";
  } catch (error) {
    showErrorAlert(`Failed to delete post with id ${postId}:`);
    console.error(`Failed to delete post with id ${postId}:`, error);
  }
}
