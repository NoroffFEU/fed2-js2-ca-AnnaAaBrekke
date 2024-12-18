import { getContainerId } from "../../ui/global/containerId.js";

export function displayPost(post) {
  const containerId = getContainerId();
  const postsContainer = document.getElementById(containerId);

  if (!postsContainer) {
    return;
  }

  const postElement = document.createElement("div");
  postElement.className = "post";
  postElement.setAttribute("data-id", post.id);

  const authorName = post.author?.name;
  postElement.innerHTML = `
   ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}" />` : ""}
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <p><strong>Tags:</strong> ${post.tags.join(", ")}</p>
    <p>Author: ${authorName}</p>

  `;

  postElement.addEventListener("click", () => {
    window.location.href = `/post/?id=${post.id}`;
  });

  postsContainer.appendChild(postElement);
}

export async function displayPosts(posts) {
  const containerId = getContainerId();
  const postsContainer = document.getElementById(containerId);

  if (!postsContainer) {
    return;
  }

  postsContainer.innerHTML = "";

  if (posts && posts.length > 0) {
    const latestPosts = posts.slice(0, 12);
    latestPosts.forEach((post) => displayPost(post));
  } else {
    postsContainer.innerHTML = `
      <p>You have no posts created.</p>
      <p><a href="/post/create/">Do you want to create one?</a></p>
    `;
  }
}
