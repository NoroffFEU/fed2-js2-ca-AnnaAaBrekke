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
    "max-w-sm w-full h-100 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700";

  postElement.innerHTML = `
    <img src="${postImageUrl}" alt="${postImageAlt}" class="w-full h-48 object-cover rounded-t-lg cursor-pointer" />
    
    <div class="p-5">
      <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer">${post.title}</h3>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${post.body}</p>
      
      <div class="flex flex-wrap gap-2 mb-3">
        ${post.tags
          .map(
            (tag) => `
            <span class="px-2 py-1 text-xs font-medium text-teal-700 bg-teal-100 rounded-full dark:bg-teal-800 dark:text-teal-200">
              ${tag}
            </span>`,
          )
          .join("")}
      </div>
  
      <a href="/profile/index.html?username=${authorName}" class="flex items-center gap-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
        <img src="${authorAvatarUrl}" alt="${authorName || "Author"}'s avatar" 
             class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 transition-transform transform hover:scale-105" />
        <p class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
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
    postsContainer.innerHTML = `
      <p>You have no posts created.</p>
      <p><a href="/post/create/">Do you want to create one?</a></p>
    `;
  }
}
