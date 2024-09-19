import { deletePost } from "../../api/post/delete.js";
import { showError } from "../global/errorHandler.js";

// I MIGHT CHANGE TO "REMOVE"

export async function onDeletePost(event) {
  event.preventDefault();

  const postId = event.target.getAttribute("data-id");

  if (!postId) {
    console.error("No post id is found");
    return;
  }

  if (!confirm(`Are you sure you want to delete the post with ID ${postId}?`)) {
    return; // Exit if the user does not confirm
  }

  try {
    await deletePost(postId); // Delete from the API

    // Remove the post from localStorage (createdPosts)
    const storedPosts = JSON.parse(localStorage.getItem("createdPosts")) || [];
    const remainingPostsList = storedPosts.filter(
      (post) => post.id !== parseInt(postId)
    );
    localStorage.setItem("createdPosts", JSON.stringify(remainingPostsList));

    alert(`Post with id ${postId} is deleted successfully`);

    // Wait 500ms before redirecting
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    showError(`Failed to delete post with id ${postId}`);
    console.error(`Failed to delete post with id ${postId}`, error);
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   const deleteButtons = document.querySelectorAll(".delete-btn");

//   // Attach event listener to each delete button
//   deleteButtons.forEach((button) => {
//     button.addEventListener("click", onDeletePost);
//   });
// });
