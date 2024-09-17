import { deletePost } from "../../api/post/delete.js";

export async function onDeletePost(event) {
  event.preventDefault();

  const postId = event.target.getAttribute("id");

  if (!postId) {
    console.error("No post id is found");
    return;
  }

  if (!confirm(`Are you sure you want to delete the post with ID ${postId}?`)) {
    return; // Exit if the user does not confirm
  }

  try {
    await deletePost(postId);
    alert("Post with id ${postId} is deleted successfully");
  } catch (error) {
    console.error("Failed to delete post with id ${postId}", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");

  // Attach event listener to each delete button
  deleteButtons.forEach((button) => {
    button.addEventListener("click", onDeletePost);
  });
});

