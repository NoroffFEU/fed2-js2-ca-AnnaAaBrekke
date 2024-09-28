/**
 * Generates headers for API requests, including the API key and access token if available.
 * 
 * @param {string} [accessToken=""] - The access token to be included in the Authorization header.
 * @returns {Headers} - A Headers object with the necessary API key, access token, and content type.
 * @throws {Error} If the API key is missing or not configured correctly.
 */
export function headers(accessToken = "") {
  const headers = new Headers();
  const apiKey = localStorage.getItem("apiKey");

  if (apiKey) {
    headers.append("X-Noroff-API-Key", apiKey);
  } else {
    throw new Error("API Key is missing or not configured correctly. Please ensure the key is generated and stored correctly.");
  }

  if (accessToken) {
    headers.append("Authorization", `Bearer ${accessToken}`);
  }

  headers.append("Content-Type", "application/json");

  return headers;
}
