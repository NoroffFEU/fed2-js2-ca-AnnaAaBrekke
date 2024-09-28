import PostService from "../../api/post/postService.js";
import { showSuccessAlert, showErrorAlert } from "../global/alertHandler.js";

const postService = new PostService(); // Create an instance of PostService

export async function onDeletePost(event) {
  const postId = event.target.getAttribute("data-id");

  if (!postId) {
    console.error("No post ID found in the button's data-id attribute.");
    return;
  }

  if (!confirm(`Are you sure you want to delete the post with ID ${postId}?`)) {
    return; // Exit if the user does not confirm
  }

  try {
    await postService.deletePost(postId);
    showSuccessAlert(`Post with ID ${postId} has been deleted successfully!`);
    window.location.href = "/";
  } catch (error) {
    // Check if the error message is related to permissions
    if (error.message.includes("permission")) {
      showErrorAlert("You do not have permission to delete this post because it is not your post.");
    } else {
      // Log the error silently for debugging, but no alert will be shown for other errors
      console.error(`Failed to delete post with ID ${postId}:`, error);
    }
  }
}
