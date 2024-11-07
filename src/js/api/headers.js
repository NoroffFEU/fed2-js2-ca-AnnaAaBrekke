import { API_KEY } from "./constants";

/**
 * Generates headers for API requests, including the API key and access token if available.
 * If the API key is missing or localStorage is unavailable, returns an empty Headers object.
 *
 * @param {string} [accessToken=""] - The access token to be included in the Authorization header.
 * @returns {Headers} - A Headers object with the necessary API key and access token.
 */
export function headers() {
  const headers = new Headers();

  try {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve the access token

    if (API_KEY) {
      headers.append("X-Noroff-API-Key", API_KEY);
    }

    if (accessToken) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    }

    headers.append("Content-Type", "application/json");

    return headers;
  } catch (error) {
    console.error("Error generating headers:", error);
    return headers;
  }
}
