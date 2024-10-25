import { loadUserProfileAndPosts } from "../../router/views/profile.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js";

async function followUser(username) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}/follow`, {
      method: "PUT",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to follow user");
    }

    const data = await response.json();
    console.log("Followed users", data);
    loadUserProfileAndPosts(username);
  } catch (error) {
    showErrorAlert(`Error following user: ${error.message}`);
  }

  async function unfollowUser(username) {
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
      loadUserProfileAndPosts(username);
    } catch (error) {
      showErrorAlert(`Error unfollowing user: ${error.message}`);
    }
  }
}
