import { loadUserProfileAndPosts } from "../../router/views/profile.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { updateFollowButtons } from "../../ui/profile/followBtns.js";
import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Sends a request to follow a specified user and updates the UI accordingly.
 *
 * @async
 * @function followUser
 * @param {string} username - The username of the user to follow.
 * @returns {Promise<void>} Resolves once the follow request completes and the UI is updated.
 * @throws Will throw an error if the follow request fails.
 */

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

/**
 * Sends a request to unfollow a specified user and updates the UI accordingly.
 *
 * @async
 * @function unFollowUser
 * @param {string} username - The username of the user to unfollow.
 * @returns {Promise<void>} Resolves once the unfollow request completes and the UI is updated.
 * @throws Will throw an error if the unfollow request fails.
 */

export async function unFollowUser(username) {
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
