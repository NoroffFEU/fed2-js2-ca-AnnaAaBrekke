import { showLoader, hideLoader } from "../../ui/global/loader.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { displayPosts } from "../../router/views/posts.js";
import PostService from "../../api/post/postService.js";

const postService = new PostService();

/**
 * Loads and displays posts with pagination. Shows a loader while posts are being fetched.
 * 
 * @param {number} [limit=12] - The number of posts to load per page.
 * @param {number} [page=1] - The page number to load.
 * @returns {Promise<void>} - Resolves when posts are loaded and displayed or throws an error if the process fails.
 * @throws {Error} If an error occurs while fetching or displaying the posts.
 */
export async function loadPosts(limit = 12, page = 1) {
  try {
    showLoader();

    const posts = await postService.fetchPosts({ limit, page });

    displayPosts(posts);
  } catch (error) {
    showErrorAlert("Error loading posts.");
    throw new Error(`Error loading posts: ${error.message}`);
  } finally {
    hideLoader();
  }
}
