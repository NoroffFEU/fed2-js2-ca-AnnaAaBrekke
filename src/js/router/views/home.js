import { readPosts } from "../../api/post/read.js";

export function displayPost(post) {
  const postsContainer = document.querySelector(".postsContainer"); // Ensure there's a container for posts

  if (!postsContainer) {
    console.error("The posts container element was not found in the DOM.");
    return;
  }

  const postElement = document.createElement("div");
  postElement.className = "post";
  postElement.setAttribute("data-id", post.id); // Set the post ID as a data attribute for easy retrieval

  // Create post content elements
  postElement.innerHTML = `
    <h3>${post.title}</h3>
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
  `;

  postElement.addEventListener("click", async () => {
    const postId = post.id;
    window.location.href = `/post/?id=${postId}`;
  });

  // Append the new post to the bottom of the container
  postsContainer.appendChild(postElement); // Use appendChild instead of prepend
}

export async function displayPosts(posts) {
  const postsContainer = document.querySelector(".postsContainer");
  postsContainer.innerHTML = ""; // Clear the container

  if (posts && posts.length > 0) {
    const latestPosts = posts.slice(0, 100);
    latestPosts.forEach((post) => displayPost(post));
  } else {
    postsContainer.innerHTML = "<p>No posts available.</p>";
  }
}

async function loadPosts() {
  try {
    console.log("Loading posts..."); // Debugging log

    const apiPosts = await readPosts(12, 1);
    console.log("API Posts fetched:", apiPosts); // Debugging log

    const saveCreatedPosts =
      JSON.parse(localStorage.getItem("createdPosts")) || [];
    console.log("Saved created posts:", saveCreatedPosts); // Debugging log

    let allPosts = [...saveCreatedPosts, ...apiPosts];
    console.log("All posts to display:", allPosts); // Debugging log

    displayPosts(allPosts);
  } catch (error) {
    console.error("Error loading posts:", error.message);
  }
}

// Load posts on page load
document.addEventListener("DOMContentLoaded", loadPosts);
