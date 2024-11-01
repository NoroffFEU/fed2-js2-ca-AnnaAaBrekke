import PostService from "../../api/post/postService.js";
import { authGuard } from "../../utilities/authGuard.js";
import { displayPosts } from "./posts.js";
import { showLoader, hideLoader } from "../../ui/global/loader.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { readProfile } from "../../api/profile/read.js";
import {
  followButtonsListener,
  updateFollowButtons,
} from "../../ui/profile/followBtns.js";
import { loadNavbar } from "../../ui/global/navbar.js";

authGuard();
loadNavbar();

const postService = new PostService();

export async function loadUserProfileAndPosts(username) {
  try {
    showLoader();

    const profileResponse = await readProfile(username);
    if (!profileResponse || !profileResponse.data) {
      throw new Error("Profile data not found.");
    }
    const profile = profileResponse.data;

    document.querySelector("#profile-name").textContent = profile.name;
    document.querySelector("#profile-bio").textContent =
      profile.bio || "No bio provided.";
    document.querySelector("#profile-avatar").src =
      profile.avatar?.url || "https://placehold.co/600x400";
    document.querySelector("#profile-banner").src =
      profile.banner?.url || "https://placehold.co/600x400";

    // Display follower and following counts
    const followerCounter = document.getElementById("follower-counter");
    followerCounter.textContent = profile._count.followers;

    const followingCounter = document.getElementById("following-counter");
    followingCounter.textContent = profile._count.following;

    const currentUserEmail = JSON.parse(localStorage.getItem("user")).email;
    const isFollowing = profile.followers.some(
      (follower) => follower.email === currentUserEmail,
    );

    // Update follow/unfollow button based on follow status
    updateFollowButtons(username, isFollowing);

    // Load the user's posts
    const userPosts = await postService.readPostsByUser({
      username,
      limit: 12,
      page: 1,
    });
    displayPosts(userPosts);
  } catch (error) {
    showErrorAlert(`Error loading profile or posts: ${error.message}`);
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
  username = user?.name || null;
}

if (username) {
  loadUserProfileAndPosts(username);
  followButtonsListener(username);
} else {
  console.error("No username found in the URL or localStorage.");
}
