import { deletePost } from "../../api/post/delete.js";

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
    await deletePost(postId);

    const storedPosts = JSON.parse(localStorage.getItem("createdPosts")) || [];
    const updatedPostsList = storedPosts.filter(post => post.id !== postId);
    localStorage.setItem("createdPosts", JSON.stringify(updatedPostsList));

    
    alert("Post with id ${postId} is deleted successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 500); // Wait 500ms before redirecting
    window.location.href = "/"; //fix so that it is not executing before the alert
  } catch (error) {
    console.error("Failed to delete post with id ${postId}", error);
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   const deleteButtons = document.querySelectorAll(".delete-btn");

//   // Attach event listener to each delete button
//   deleteButtons.forEach((button) => {
//     button.addEventListener("click", onDeletePost);
//   });
// });