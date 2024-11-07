import PostService from "../../api/post/postService.js";
import { onDeletePost } from "../../ui/post/delete.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { getQueryParam } from "../../ui/global/urlParams.js";
import { hideLoader, showLoader } from "../../ui/global/loader.js";
import { loadNavbar } from "../../ui/global/navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  displaySinglePost();
  loadNavbar();
});

const postService = new PostService();

async function displaySinglePost() {
  const postId = getQueryParam("id");

  if (!postId) {
    return;
  }

  showLoader();

  try {
    const post = await postService.fetchPosts({
      id: postId,
      includeAuthor: true,
    });

    const postsContainer = document.getElementById("postsContainer");
    if (!postsContainer) {
      return;
    }

    postsContainer.innerHTML = "";

    const postElement = document.createElement("div");
    postElement.className = "single-post";

    const postImageUrl = post.media?.url || "https://placehold.co/600x400";
    const postImageAlt = post.media?.alt || "Default image";
    const authorName = post.author?.name;

    const authorAvatarUrl =
      post.author?.avatar?.url || "/assets/images/default-avatar.png";

    postElement.className =
      "max-w-full xs:max-w-2xl w-full h-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg flex flex-col mx-auto mt-8 p-4 xs:p-8";

    postElement.innerHTML = `
      <img src="${postImageUrl}" alt="${postImageAlt}" class="post-image"/>
    
      <div class="p-4 xs:p-5 flex-gow flex flex-col items-center xs:items-start text-center xs:text-left overflow-hidden">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body-text">${post.body}</p>
    
        <div class="flex flex-wrap gap-2 mt-2 justify-center xs:justify-start">
          ${post.tags
            .map(
              (tag) => `
              <span class="tag">
                ${tag}
              </span>`,
            )
            .join("")}
        </div>
    
        <a href="/profile/index.html?username=${authorName}" class="flex flex-col xs:flex-row items-center gap-3 py-3 mt-auto rounded-lg transition-colors cursor-pointer">
          <img src="${authorAvatarUrl}" alt="${authorName || "Author"}'s avatar" 
              class="sm:w-avatarSinglePost sm:h-avatarSinglePost xs:w-avatarNav xs:h-avatarNav  mt-4 rounded-full border border-gray-600 hover:border-white" />
          <p class="text-sm xs:text-lg mt-4 font-medium text-gray-300">
            ${authorName || "Unknown"}
          </p>
        </a>
      </div>
    `;

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (loggedInUser && post.author && loggedInUser.name === post.author.name) {
      postElement.innerHTML += `
        <button type="submit" class="delete-btn" data-id="${postId}">Delete Post</button>
        <button type="submit" class="edit-btn" data-id="${postId}">Edit Post</button>
      `;

      const deleteButton = postElement.querySelector(".delete-btn");
      if (deleteButton) {
        deleteButton.addEventListener("click", onDeletePost);
      }

      const editButton = postElement.querySelector(".edit-btn");
      if (editButton) {
        editButton.addEventListener("click", () => {
          window.location.href = `/post/edit/?id=${postId}`;
        });
      }
    }

    postsContainer.appendChild(postElement);
  } catch (error) {
    showErrorAlert(`Error fetching the single post: ${error.message}`);
  } finally {
    hideLoader();
  }
}
