import { authGuard } from "../../utilities/authGuard.js";
import { readPostsByUser } from "../../api/post/read.js";
import { showError } from "../../ui/global/errorHandler.js";
import { hideLoader, showLoader } from "../../ui/global/loader.js";

export function displayPost(post) {
  const postsContainer = document.querySelector(".postsContainer"); // Ensure there's a container for posts

  if (!postsContainer) {
    console.error("The posts container element was not found in the DOM.");
    return;
  }

  const postElement = document.createElement("div");
  postElement.className = "post";
  postElement.setAttribute("data-id", post.id); // Set the post ID as a data attribute for easy retrieval

  // // Default values for media
  // const defaultImage =
  //   "https://images.unsplash.com/photo-1611652932014-6c9fb7eabef1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  // const defaultAltText = "Default image";

  // const imageSrc = post.media?.url || defaultImage;
  // const imageAlt = post.media?.alt || defaultAltText;

  // Create post content elements
  postElement.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <p><strong>Tags:</strong> ${post.tags.join(", ")}</p>
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
    const latestPosts = posts.slice(0, 12);
    latestPosts.forEach((post) => displayPost(post));
  } else {
    postsContainer.innerHTML = "<p>No posts available.</p>";
  }
}

async function loadUserPosts() {
  try {
    console.log("Loading user's posts..."); // Debugging log

    // Fetch posts created by the logged-in user
    const userPosts = await readPostsByUser({ limit: 12, page: 1 });
    console.log("User's posts fetched:", userPosts); // Debugging log

    // Display the user's posts
    displayPosts(userPosts);
  } catch (error) {
    showError("Error loading user's posts.");
    console.error("Error loading user's posts:", error.message);
  }
}

// Load user's posts on page load
document.addEventListener("DOMContentLoaded", () => {
  showLoader();
  authGuard(); // Ensure the user is authenticated
  loadUserPosts(); // Load posts created by the logged-in user
  hideLoader();
});
