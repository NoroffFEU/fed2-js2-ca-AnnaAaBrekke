import PostService from "../../api/post/postService.js";
import { authGuard } from "../../utilities/authGuard.js";
import { displayPosts } from "./posts.js";
import { showLoader, hideLoader } from "../../ui/global/loader.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { readProfile } from "../../api/profile/read.js";

authGuard();

const postService = new PostService();

/**
 * Loads and displays a user's profile and their associated posts.
 *
 * The function fetches the user's profile information (e.g., name, bio, avatar, banner)
 * and posts based on the provided username. It updates the profile section in the DOM
 * and displays the user's posts in a posts container.
 *
 * @async
 * @function loadUserProfileAndPosts
 * @param {string} username - The username of the profile to load. This can be retrieved either
 *                            from the URL or local storage.
 * @throws {Error} Will throw an error if the profile or posts cannot be loaded.
 * @returns {Promise<void>} Resolves when the profile and posts have been successfully loaded and displayed.
 */
export async function loadUserProfileAndPosts(username) {
  try {
    showLoader();

    const profileResponse = await readProfile(username);
    if (!profileResponse || !profileResponse.data) {
      throw new Error("Profile data not found.");
    }
    const profile = profileResponse.data; 

    console.log("Profile fetched:", profile);

    document.querySelector("#profile-name").textContent = profile.name;
    document.querySelector("#profile-bio").textContent =
      profile.bio || "No bio provided.";
    document.querySelector("#profile-avatar").src =
      profile.avatar?.url || "/default-avatar.png";
    document.querySelector("#profile-banner").src =
      profile.banner?.url || "/default-banner.jpg";

    const userPosts = await postService.readPostsByUser({
      username,
      limit: 12,
      page: 1,
    });
    console.log(`${username}'s posts fetched:`, userPosts);
    displayPosts(userPosts);
  } catch (error) {
    showErrorAlert(`Error loading profile or posts: ${error.message}`);
    console.error(error);
  } finally {
    hideLoader();
  }
}

// Get the username from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
let username = urlParams.get("username"); // Get 'username' from the URL

if (!username) {
  // If no username is provided, get it from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  username = user?.name;
}

if (username) {
  loadUserProfileAndPosts(username);
} else {
  console.error("No username found in the URL or localStorage.");
}
