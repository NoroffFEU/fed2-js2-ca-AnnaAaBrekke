import PostService from "../../api/post/postService.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { authGuard } from "../../utilities/authGuard.js";
import { loadPosts } from "../../ui/post/postLoader.js";
import { displayPosts } from "./posts.js";
import { loadNavbar } from "../../ui/global/navbar.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    if (!authGuard()) {
      showErrorAlert("User not authenticated.");
      return;
    }

    await loadNavbar();
    await loadPosts();

    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");

    const handleSearch = async () => {
      const query = searchInput.value.trim();
      const resultsHeadline = document.getElementById(
        "search-results-headline",
      );

      if (query) {
        try {
          const postService = new PostService();
          const posts = await postService.searchPosts(query);
          displayPosts(posts);

          if (posts.length > 0) {
            resultsHeadline.textContent = `Search Results for: "${query}"`;
            resultsHeadline.classList.remove("hidden");
          } else {
            resultsHeadline.textContent = "No posts matched your search";
            resultsHeadline.classList.remove("hidden");
          }
        } catch (error) {
          showErrorAlert("No posts found for the search you made.");
          resultsHeadline.classList.add("hidden");
        }
      } else {
        resultsHeadline.classList.add("hidden");
      }
    };

    searchButton.addEventListener("click", handleSearch);

    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    });
  } catch (error) {
    showErrorAlert("An error occurred while loading the posts.");
  }
});
