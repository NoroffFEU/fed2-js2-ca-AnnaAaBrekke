import { readPost } from "../../api/post/read.js";
import { hideLoader, showLoader } from "../../ui/global/loader.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { onDeletePost } from "../../ui/post/delete.js";
import { authGuard } from "../../utilities/authGuard.js";

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

async function displaySinglePost() {
  const postId = getQueryParam("id");

  if (!postId) {
    console.error("Post ID not found in URL.");
    const postsContainer = document.querySelector(".postsContainer");
    return; // Exit early if no post ID
  }

  try {
    console.log("Fetching post with ID:", postId); // Debugging log
    const post = await readPost(postId);
    console.log("Post fetched successfully:", post); // Debugging log

    const postsContainer = document.querySelector(".postsContainer");
    if (!postsContainer) {
      console.error("The posts container element was not found in the DOM.");
      return;
    }
    postsContainer.innerHTML = ""; // Clear the container to display only the selected post

    const postElement = document.createElement("div");
    postElement.className = "single-post";

    // // Default values for media
    // const defaultImage =
    //   "https://images.unsplash.com/photo-1611652932014-6c9fb7eabef1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    // const defaultAltText = "Default image description";

    // const imageSrc = post.media?.url || defaultImage;
    // const imageAlt = post.media?.alt || defaultAltText;

    // <img src="${imageSrc}" alt="${imageAlt}" />

    // Create post content elements
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <p><strong>Tags:</strong> ${post.tags.join(", ")}</p>
      <p><strong>Comments:</strong> ${post._count.comments}</p>
      <p><strong>Reactions:</strong> ${post._count.reactions}</p>
      ${
        post._author
          ? `<p><strong>Author:</strong> ${post._author.name}</p>`
          : ""
      }
      <p><em>Created: ${new Date(post.created).toLocaleDateString()}</em></p>
      <p><em>Last Updated: ${new Date(
        post.updated
      ).toLocaleDateString()}</em></p>
    `;

    // Check authentication status
    if (localStorage.token) {
      // Adjust this condition based on your token storage logic
      postElement.innerHTML += `
        <button type="submit" class="delete-btn" data-id="${postId}">Delete Post</button>
        <button type="submit" class="edit-btn" data-id="${postId}">Edit Post</button>
      `;

      // Attach event listener to the delete button
      const deleteButton = postElement.querySelector(".delete-btn");
      if (deleteButton) {
        deleteButton.addEventListener("click", onDeletePost);
      }

      // Attach event listener to the edit button
      const editButton = postElement.querySelector(".edit-btn");
      if (editButton) {
        editButton.addEventListener("click", () => {
          window.location.href = `/post/edit/?id=${postId}`;
        });
      }
    }

    postsContainer.appendChild(postElement); // Append the single post element to the container
  } catch (error) {
    console.error("Error fetching the single post and displaying it:", error);
    showErrorAlert("Error fetching the single post and displaying it::"); // Show error message
    const postsContainer = document.querySelector(".postsContainer");
    if (postsContainer) {
      postsContainer.innerHTML =
        "<p>Error loading post. Please try again later.</p>";
    }
  }
}

// Load single post on page load
document.addEventListener("DOMContentLoaded", () => {
  showLoader();
  authGuard();
  setLogoutListener();
  displaySinglePost();
  hideLoader();
});
