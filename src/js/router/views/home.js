import { readPosts } from "../../api/post/read.js";
import { displayPost } from "./post.js";

// Function to display multiple posts on the homepage
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

// Load posts on page load
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const posts = await readPosts(12, 1); // Fetch all posts
    displayPosts(posts);
  } catch (error) {
    console.error("Error loading posts:", error.message); // Handle error if fetching fails
  }
});
