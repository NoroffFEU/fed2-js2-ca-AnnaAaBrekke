import { loadUserProfileAndPosts } from "../../router/views/profile.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { updateFollowButtons } from "../../ui/profile/followBtns.js";
import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

export async function followUser(username) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}/follow`, {
      method: "PUT",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to follow user");
    }

    // Update UI immediately to show the follow state
    updateFollowButtons(username, true);

    // Reload profile data to ensure UI reflects backend
    await loadUserProfileAndPosts(username);
  } catch (error) {
    showErrorAlert(`Error following user: ${error.message}`);
  }
}

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

    // Update UI immediately to show the unfollow state
    updateFollowButtons(username, false);

    // Reload profile data to ensure UI reflects backend
    await loadUserProfileAndPosts(username);
  } catch (error) {
    showErrorAlert(`Error unfollowing user: ${error.message}`);
  }
}
