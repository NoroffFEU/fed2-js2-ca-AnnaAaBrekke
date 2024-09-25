import PostService from "../../api/post/postService.js";
import { onDeletePost } from "../../ui/post/delete.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded, executing displaySinglePost.");
  displaySinglePost();
});

const postService = new PostService(); // Create an instance of PostService

async function displaySinglePost() {
  console.log("displaySinglePost function executed.");

  const postId = getQueryParam("id");

  console.log("Post ID retrieved from URL:", postId); // Log the postId

  if (!postId) {
    console.error("Post ID not found in URL.");
    return;
  }

  try {
    console.log("Fetching post with ID:", postId); // Log the postId being fetched
    const post = await postService.fetchPosts({ id: postId }); // Use fetchPosts method with id

    console.log("Post fetched successfully:", post); // Log the fetched post object

    const postsContainer = document.querySelector(".postsContainer");
    if (!postsContainer) {
      console.error("The posts container element was not found in the DOM.");
      return;
    }

    console.log("Clearing posts container and displaying post..."); // Log before updating DOM
    postsContainer.innerHTML = ""; // Clear the container to display only the selected post

    const postElement = document.createElement("div");
    postElement.className = "single-post";

    // Add defensive checks for undefined properties like 'tags'
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <p><strong>Tags:</strong> ${post.tags ? post.tags.join(", ") : "No tags available"}</p>
    `;

    // Log whether the user has a token before rendering buttons
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

// Helper function to get query parameters from the URL
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get(name);
  console.log(`Query parameter "${name}" value:`, value); // Log the query parameter value
  return value;
}
