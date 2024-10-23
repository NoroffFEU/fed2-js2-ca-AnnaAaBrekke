import PostService from "../../api/post/postService.js";
import { authGuard } from "../../utilities/authGuard.js";
import { displayPosts } from "./posts.js";
import { showLoader, hideLoader } from "../../ui/global/loader.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { readProfile } from "../../api/profile/read.js";

authGuard();

const postService = new PostService();

/**
 * Function to load and display the user's profile and their posts.
 * @param {string} username - The username of the profile to load.
 */
export async function loadUserProfileAndPosts(username) {
  try {
    showLoader();

    const profileResponse = await readProfile(username);
    const profile = profileResponse.data; // Assuming 'data' holds the actual profile

    console.log("Profile fetched:", profile);

    // Display the profile data
    document.querySelector("#profile-name").textContent = profile.name;
    document.querySelector("#profile-bio").textContent =
      profile.bio || "No bio provided.";
    document.querySelector("#profile-avatar").src =
      profile.avatar?.url || "/default-avatar.png";
    document.querySelector("#profile-banner").src =
      profile.banner?.url || "/default-banner.jpg";

    // Fetch posts created by the specified user (using PostService)
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
