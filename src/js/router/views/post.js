import PostService from "../../api/post/postService.js";
import { onDeletePost } from "../../ui/post/delete.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { getQueryParam } from "../../ui/global/urlParams.js";
import { hideLoader, showLoader } from "../../ui/global/loader.js";

document.addEventListener("DOMContentLoaded", () => {
  displaySinglePost();
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

    const postsContainer = document.querySelector(".postsContainer");
    if (!postsContainer) {
      return;
    }

    postsContainer.innerHTML = "";

    const postElement = document.createElement("div");
    postElement.className = "single-post";

    const authorName = post.author?.name;

    postElement.innerHTML = `
      ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}" />` : ""}
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <p><strong>Tags:</strong> ${
        post.tags ? post.tags.join(", ") : "No tags available"
      }</p>
    <a href="/profile/index.html?username=${authorName}">${authorName}</a>
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
