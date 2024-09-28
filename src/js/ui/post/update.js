import PostService from "../../api/post/postService.js";
import { showErrorAlert } from "../global/alertHandler.js";

const postService = new PostService();

/**
 * Fetches post data by ID and populates the form fields with the post's title, body, and tags.
 *
 * @param {string} postId - The ID of the post to fetch and populate data for.
 * @returns {Promise<void>} - Resolves when the post data is fetched and the form is populated.
 * @throws {Error} If there is an error fetching the post data.
 */
export async function fetchAndPopulatePostData(postId) {
  try {
    const post = await postService.fetchPosts({ id: postId });

    if (post) {
      document.getElementById("title").value = post.title || "";
      document.getElementById("body").value = post.body || "";

      const tagsField = document.getElementById("tags");
      tagsField.value =
        post.tags && Array.isArray(post.tags) ? post.tags.join(", ") : "";
    } else {
      showErrorAlert("No post found to populate the form.");
    }
  } catch (error) {
    showErrorAlert("Error fetching the post data.");
    throw new Error(`Error fetching the post data: ${error.message}`);
  }
}
