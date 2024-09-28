/**
 * Generates headers for API requests, including the API key and access token if available.
 * If the API key is missing or localStorage is unavailable, returns an empty Headers object.
 * 
 * @param {string} [accessToken=""] - The access token to be included in the Authorization header.
 * @returns {Headers|null} - A Headers object with the necessary API key and access token, or null if there is an error.
 */
export function headers(accessToken = "") {
  const headers = new Headers();

  try {
    const apiKey = localStorage.getItem("apiKey");
    if (!apiKey) {
      return null;
    }

    headers.append("X-Noroff-API-Key", apiKey);

    if (accessToken) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    }

    headers.append("Content-Type", "application/json");
    return headers;
  } catch (error) {
    return null; 
  }
}
