import { readPost } from "../../api/post/read.js";

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

async function displaySinglePost() {
  const postId = getQueryParam("id");

  if (!postId) {
    console.error("Post ID not found in URL.");
    const postsContainer = document.querySelector(".postsContainer");
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

    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <p><strong>Tags:</strong> ${post.tags.join(", ")}</p>
      ${
        post.media && post.media.url
          ? `<img src="${post.media.url}" alt="${
              post.media.alt || "Post Image"
            }" />`
          : ""
      }
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

      <button type="button" class="delete-btn">Delete Post</button>
      <button type="button" class="edit-btn">Edit Post</button>

      `;

    postsContainer.appendChild(postElement); // Append the single post element to the container
  } catch (error) {
    console.error("Error fetching the single post and displaying it:", error);
    const postsContainer = document.querySelector(".postsContainer");
    if (postsContainer) {
      postsContainer.innerHTML =
        "<p>Error loading post. Please try again later.</p>";
    }
  }
}

// Load single post on page load
document.addEventListener("DOMContentLoaded", displaySinglePost);
