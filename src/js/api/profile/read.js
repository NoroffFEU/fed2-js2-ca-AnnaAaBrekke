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

// /**
//  * Fetches all profiles with pagination support.
//  * @param {number} [limit=10] - Number of profiles to retrieve per page.
//  * @param {number} [page=1] - The page number to retrieve.
//  * @returns {Promise<Object>} - The profiles data.
//  */
// export async function readProfiles(limit = 12, page = 1) {
//   try {
//     const response = await fetch(
//       `${API_SOCIAL_PROFILES}?limit=${limit}&page=${page}`,
//       {
//         headers: headers(),
//         method: "GET",
//       },
//     );

//     if (response.ok) {
//       const profilesData = await response.json();
//       console.log("Profiles fetched:", profilesData);
//       return profilesData;
//     } else {
//       const errorMessage = await response.text();
//       throw new Error(`Error fetching profiles: ${errorMessage}`);
//     }
//   } catch (error) {
//     throw new Error(`Error fetching profiles: ${error.message}`);
//   }
// }
