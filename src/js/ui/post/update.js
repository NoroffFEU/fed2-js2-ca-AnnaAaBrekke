import PostService from "../../api/post/PostService.js";
import { showErrorAlert } from "../global/alertHandler.js";

const postService = new PostService(); // Create an instance of PostService

export async function fetchAndPopulatePostData(postId) {
  try {
    const post = await postService.fetchPosts({ id: postId });

    if (post) {
      document.getElementById("title").value = post.title || "";
      document.getElementById("body").value = post.body || "";

      const tagsField = document.getElementById("tags");
      tagsField.value =
        post.tags && Array.isArray(post.tags) ? post.tags.join(", ") : ""; // Populate tags or clear if none
    } else {
      showErrorAlert("No post found to populate the form.");
    }
  } catch (error) {
    showErrorAlert("Error fetching the post data.");
    console.error("Error fetching the post data:", error);
  }
}
