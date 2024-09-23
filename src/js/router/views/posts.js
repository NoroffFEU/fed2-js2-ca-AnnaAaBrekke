import { getContainerId } from "../../ui/global/containerId.js";

// Function to display a single post in a specified container
export function displayPost(post) {
  const containerId = getContainerId();
  const postsContainer = document.getElementById(containerId);

  if (!postsContainer) {
    console.error(
      `The posts container with ID "${containerId}" was not found in the DOM.`
    );
    return;
  }

  const postElement = document.createElement("div");
  postElement.className = "post";
  postElement.setAttribute("data-id", post.id);

  // Create post content elements
  postElement.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <p><strong>Tags:</strong> ${post.tags.join(", ")}</p>
    <p><strong>Comments:</strong> ${post._count.comments}</p>
    <p><strong>Reactions:</strong> ${post._count.reactions}</p>
  `;

  postElement.addEventListener("click", () => {
    window.location.href = `/post/?id=${post.id}`;
  });

  postsContainer.appendChild(postElement);
};

// Function to display multiple posts
export async function displayPosts(posts) {
  const containerId = getContainerId();
  const postsContainer = document.getElementById(containerId);

  if (!postsContainer) {
    console.error(
      `The posts container with ID "${containerId}" was not found in the DOM.`
    );
    return;
  }

  postsContainer.innerHTML = "";

  if (posts && posts.length > 0) {
    const latestPosts = posts.slice(0, 12); // Limit to 12 posts
    latestPosts.forEach((post) => displayPost(post));
  } else {
    postsContainer.innerHTML = "<p>No posts available.</p>";
  }
};