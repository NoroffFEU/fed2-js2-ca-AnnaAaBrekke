// import { updatePost } from "../../api/post/update.js";
// import { showSuccessAlert, showErrorAlert } from "../global/alertHandler.js";

// export async function onUpdatePost(event) {
//   event.preventDefault();

//   const postId = event.target.getAttribute("data-id");

//   if (!postId) {
//     console.error("No post ID is found");
//     return;
//   }

//   try {
//     const formData = new FormData(event.target);
//     const title = formData.get("title");
//     const body = formData.get("body");
//     const tags = formData.get("tags");

//     const updatedPost = {
//       title,
//       body,
//       tags,
//     };

//     // Update the post on the server
//     await updatePost(postId, updatedPost);

//     // Update post in localStorage (if applicable)
//     const storedPosts = JSON.parse(localStorage.getItem("createdPosts")) || [];
//     const updatedPosts = storedPosts.map((post) =>
//       post.id === postId ? { ...post, ...updatedPost } : post
//     );
//     localStorage.setItem("createdPosts", JSON.stringify(updatedPosts));

//     showSuccessAlert(
//       `Post with id ${postId} and title ${title} is updated successfully!`
//     );

//     // Redirect to the single post page after a delay
//     setTimeout(() => {
//       window.location.href = `/post/?id=${postId}`; // Correct redirection format
//     }, 500);
//   } catch (error) {
//     showErrorAlert(
//       `Failed to update post with title ${title} and id ${postId}:`
//     );
//     console.error(
//       `Failed to update post with title ${title} and id ${postId}:`,
//       error
//     );
//   }
// }

import PostService from "../../api/post/postService.js";
import { showSuccessAlert, showErrorAlert } from "../global/alertHandler.js";

const postService = new PostService(); // Create an instance of PostService

export async function onUpdatePost(event, postId) {
  event.preventDefault();

  try {
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const body = formData.get("body");
    const tags = formData.get("tags");

    const updatedPost = { title, body, tags };

    await postService.updatePost(postId, updatedPost); // Use updatePost method from PostService

    showSuccessAlert(`Post with title "${title}" updated successfully!`);
    setTimeout(() => {
      window.location.href = `/post/?id=${postId}`;
    }, 1000);
  } catch (error) {
    showErrorAlert(`Failed to update post with ID ${postId}: ${error.message}`);
    console.error(`Failed to update post with ID ${postId}:`, error);
  }
}


