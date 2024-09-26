import PostService from "../../api/post/PostService.js";
import { showSuccessAlert, showErrorAlert } from "../global/alertHandler.js";

const postService = new PostService(); // Create an instance of PostService

export async function onDeletePost(event) {
  const postId = event.target.getAttribute("data-id");

  if (!postId) {
    console.error("No post ID found in the button's data-id attribute");
    return;
  }

  if (!confirm(`Are you sure you want to delete the post with ID ${postId}?`)) {
    return; // Exit if the user does not confirm
  }

  try {
    await postService.deletePost(postId);

    showSuccessAlert(`Post with id ${postId} has been deleted successfully!`);
    window.location.href = "/";
  } catch (error) {
    showErrorAlert(`Failed to delete post with id ${postId}:`);
    console.error(`Failed to delete post with id ${postId}:`, error);
  }
}
