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

  const postImageUrl = post.media?.url || "https://placehold.co/600x400";
  const postImageAlt = post.media?.alt || "Default image";
  const authorName = post.author?.name;
  const authorAvatarUrl =
    post.author?.avatar?.url || "/assets/images/default-avatar.png";

  postElement.className =
    "max-w-sm w-full h-100 bg-gray-800 border border-gray-700 rounded-lg shadow-lg";

  postElement.innerHTML = `
    <img src="${postImageUrl}" alt="${postImageAlt}" class="post-image cursor-pointer" />
    
    <div class="p-5">
      <h3 class="post-title">${post.title}</h3>
      <p class="post-body-text">${post.body}</p>
      
      <div class="flex flex-wrap gap-2 mb-3">
        ${post.tags
          .map(
            (tag) => `
            <span class="tag">
              ${tag}
            </span>`,
          )
          .join("")}
      </div>
  
      <a href="/profile/index.html?username=${authorName}" class="flex items-center gap-3 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
        <img src="${authorAvatarUrl}" alt="${authorName || "Author"}'s avatar" 
             class="w-10 h-10 rounded-full border border-gray-600 transition-transform transform hover:scale-105" />
        <p class="text-sm font-medium text-gray-300 hover:text-white">
          ${authorName || "Unknown"}
        </p>
      </a>
    </div>
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
    postsContainer.className =
      "flex justify-center bg-teal-700 p-4 mt-2 rounded-md text-center";

    postsContainer.innerHTML = `
      <h4 class="text-2xl font-normal text-gray-100 mb-2">
        No posts created...
      </h4>
  `;
  }
}
