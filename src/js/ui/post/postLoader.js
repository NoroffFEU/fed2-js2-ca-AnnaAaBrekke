import { showLoader, hideLoader } from "../../ui/global/loader.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { displayPosts } from "../../router/views/posts.js";
import PostService from "../../api/post/PostService.js";

const postService = new PostService();

export async function loadPosts(limit = 12, page = 1) {
  try {
    showLoader();

    const posts = await postService.fetchPosts({ limit, page });
    console.log("Posts fetched:", posts);

    displayPosts(posts);
  } catch (error) {
    showErrorAlert("Error loading posts.");
    console.error("Error loading posts:", error.message);
  } finally {
    hideLoader();
  }
}
