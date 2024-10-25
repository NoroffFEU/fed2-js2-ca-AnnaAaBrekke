// import { loadUserProfileAndPosts } from "../../router/views/profile.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { updateFollowButtons } from "../../ui/profile/followBtns.js";
import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

// Follow a user
export async function followUser(username) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}/follow`, {
      method: "PUT",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to follow user");
    }

    const data = await response.json();
    console.log("Followed user:", data);

    // Update UI to show that the user is followed
    updateFollowButtons(true);
  } catch (error) {
    showErrorAlert(`Error following user: ${error.message}`);
  }
}

// Unfollow a user
export async function unfollowUser(username) {
  try {
    const response = await fetch(
      `${API_SOCIAL_PROFILES}/${username}/unfollow`,
      {
        method: "PUT",
        headers: headers(),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to unfollow user.");
    }

    const data = await response.json();
    console.log("Unfollowed user:", data);

    // Update UI to show that the user is unfollowed
    updateFollowButtons(false);
  } catch (error) {
    showErrorAlert(`Error unfollowing user: ${error.message}`);
  }
}
