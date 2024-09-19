import { authGuard } from "../../utilities/authGuard.js";
import { readPosts } from "../../api/post/read.js";
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

  // Default values for media
  const defaultImage =
    "https://images.unsplash.com/photo-1559493909-ee5feb0b298d?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const defaultAltText = "Default image";

  const imageSrc = post.media?.url || defaultImage;
  const imageAlt = post.media?.alt || defaultAltText;

  // Create post content elements
  postElement.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <p><strong>Tags:</strong> ${post.tags.join(", ")}</p>
    <img src="${imageSrc}" alt="${imageAlt}" />
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

async function loadPosts() {
  try {
    console.log("Loading posts..."); // Debugging log

    // Fetch posts from the API
    const apiPosts = await readPosts(12, 1);
    console.log("API Posts fetched:", apiPosts); // Debugging log

    // Get saved created or updated posts from localStorage
    const saveCreatedPosts =
      JSON.parse(localStorage.getItem("createdPosts")) || [];
    console.log("Saved created posts:", saveCreatedPosts); // Debugging log

    // I will make this smaller later...also i need to adjustit because when deleting the old post does not delete...
    const allPostsMap = new Map();

    apiPosts.forEach((post) => {
      allPostsMap.set(post.id, post);
    });

    saveCreatedPosts.forEach((updatedPost) => {
      const existingPost = allPostsMap.get(updatedPost.id);

      if (existingPost) {
        const existingUpdatedDate = new Date(existingPost.updated);
        const updatedPostDate = new Date(updatedPost.updated);

        // Replace only if the updated post is newer
        if (updatedPostDate > existingUpdatedDate) {
          allPostsMap.set(updatedPost.id, updatedPost);
        }
      } else {
        // If the post doesn't exist in the map, add the updated post
        allPostsMap.set(updatedPost.id, updatedPost);
      }
    });

    // Convert the map back to an array to display posts
    let allPosts = Array.from(allPostsMap.values());

    // Sort by latest created date
    allPosts = allPosts.sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );

    console.log("All posts to display:", allPosts); // Debugging log

    // Display the combined posts
    displayPosts(allPosts);
  } catch (error) {
    showError("Error updating posts:"); // Show error message
    console.error("Error loading posts:", error.message);
  }
}

// Load posts on page load
document.addEventListener("DOMContentLoaded", () => {
  showLoader();
  authGuard(); // Ensure user is authenticated
  loadPosts(); // Load posts
  hideLoader();
});