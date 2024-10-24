import PostService from "../../api/post/postService.js"; // Correctly import PostService
import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { authGuard } from "../../utilities/authGuard.js";
import { loadPosts } from "../../ui/post/postLoader.js";
import { displayPosts } from "./posts.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Check if the user is authenticated
    if (!authGuard()) {
      showErrorAlert("User not authenticated.");
      return; // Exit if not authenticated
    }

    // Load initial posts on page load
    await loadPosts();

    // Get search button and input elements
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");

    // Function to handle searching posts
    const handleSearch = async () => {
      const query = searchInput.value.trim();
      console.log("Search query:", query); // For debugging, check if the query is correct

      if (query) {
        try {
          const postService = new PostService(); // Instantiate PostService
          const posts = await postService.searchPosts(query); // Perform the search
          displayPosts(posts); // Display the search results
        } catch (error) {
          console.error("Search error:", error); // Log any error that occurs during the search
          showErrorAlert("No posts found for the search you made.");
        }
      }
    };

    // Add event listener for search button click
    searchButton.addEventListener("click", handleSearch);

    // Add event listener for pressing "Enter" in the search input
    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    });
  } catch (error) {
    console.error("Error loading posts:", error);
    showErrorAlert("An error occurred while loading the posts.");
  }
});
