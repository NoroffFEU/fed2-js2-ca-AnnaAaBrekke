import PostService from "../../api/post/postService.js";
import { showSuccessAlert, showErrorAlert } from "../global/alertHandler.js";

const postService = new PostService();

/**
 * Handles the deletion of a post when triggered by an event. Prompts the user for confirmation,
 * deletes the post, and handles success and error scenarios.
 *
 * @param {Event} event - The event object triggered by the delete button.
 * @returns {Promise<void>} - Resolves when the post is deleted or exits early if there are errors.
 * @throws {Error} If the post deletion fails or the user lacks permission to delete the post.
 */
export async function onDeletePost(event) {
  const postId = event.target.getAttribute("data-id");

  if (!postId) {
    throw new Error("No post ID found in the button's data-id attribute.");
  }

  if (!confirm(`Are you sure you want to delete the post with ID ${postId}?`)) {
    return;
  }

  try {
    await postService.deletePost(postId);
    showSuccessAlert(`Post with ID ${postId} has been deleted successfully!`);
    window.location.href = "/";
  } catch (error) {
    showErrorAlert(`Failed to delete post: ${error.message}`);
  }
}
