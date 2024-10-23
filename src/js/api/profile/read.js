import { API_SOCIAL_PROFILES } from "../constants.js";
import { headers } from "../headers.js"; // Use headers to include the Authorization token

/**
 * Fetches the profile for a given username.
 * @param {string} username - The username of the profile to load.
 * @returns {Promise<Object>} - The profile data.
 */
export async function readProfile(username) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
      headers: headers(), // Ensure Authorization header is included with the token
      method: "GET",
    });

    if (response.ok) {
      const profileData = await response.json();
      console.log("Profile fetched:", profileData);
      return profileData;
    } else {
      const errorMessage = await response.text();
      throw new Error(`Error fetching profile: ${errorMessage}`);
    }
  } catch (error) {
    throw new Error(`Error fetching profile: ${error.message}`);
  }
}
