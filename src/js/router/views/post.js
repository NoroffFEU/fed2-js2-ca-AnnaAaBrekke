import PostService from "../../api/post/postService.js";
import { onDeletePost } from "../../ui/post/delete.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { getQueryParam } from "../../ui/global/urlParams.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded, executing displaySinglePost.");
  displaySinglePost();
});

const postService = new PostService();

async function displaySinglePost() {
  console.log("displaySinglePost function executed.");

  const postId = getQueryParam("id");

  console.log("Post ID retrieved from URL:", postId);

  if (!postId) {
    console.error("Post ID not found in URL.");
    return;
  }

  try {
    console.log("Fetching post with ID:", postId);
    const post = await postService.fetchPosts({ id: postId }); // Use fetchPosts method with id

    console.log("Post fetched successfully:", post);

    const postsContainer = document.querySelector(".postsContainer");
    if (!postsContainer) {
      console.error("The posts container element was not found in the DOM.");
      return;
    }

    console.log("Clearing posts container and displaying post...");
    postsContainer.innerHTML = "";

    const postElement = document.createElement("div");
    postElement.className = "single-post";

    // Add defensive checks for undefined properties like 'tags'
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <p><strong>Tags:</strong> ${
        post.tags ? post.tags.join(", ") : "No tags available"
      }</p>
    `;

    if (localStorage.getItem("accessToken")) {
      console.log("User is authenticated. Rendering Edit/Delete buttons...");

      postElement.innerHTML += `
        <button type="submit" class="delete-btn" data-id="${postId}">Delete Post</button>
        <button type="submit" class="edit-btn" data-id="${postId}">Edit Post</button>
      `;

      // Attach the postId correctly for delete and edit
      const deleteButton = postElement.querySelector(".delete-btn");
      if (deleteButton) {
        console.log("Attaching delete button functionality..."); // Log delete button event
        deleteButton.addEventListener("click", onDeletePost); // Simply pass the function reference, and event will be passed automatically
      }

      const editButton = postElement.querySelector(".edit-btn");
      if (editButton) {
        console.log("Attaching edit button functionality..."); // Log edit button event
        editButton.addEventListener("click", () => {
          window.location.href = `/post/edit/?id=${postId}`;
        });
      }
    }

    postsContainer.appendChild(postElement);
    console.log("Post appended to container successfully."); // Log after appending post
  } catch (error) {
    console.error("Error fetching the single post and displaying it:", error);
    showErrorAlert(`Error fetching the single post: ${error.message}`);
  }
}
