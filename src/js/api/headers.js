// headers.js
export function headers(accessToken = "") {
  const headers = new Headers();

  // Retrieve the API key from localStorage
  const apiKey = localStorage.getItem("apiKey"); // Retrieve the stored API key

  // Append API key if available
  if (apiKey) {
    headers.append("X-Noroff-API-Key", apiKey);
  } else {
    console.error("API Key is missing or not configured correctly. Please ensure the key is generated and stored correctly.");
  }

  // Append Authorization header if accessToken is provided
  if (accessToken) {
    headers.append("Authorization", `Bearer ${accessToken}`);
  }

  // Include "Content-Type" header by default
  headers.append("Content-Type", "application/json");

  return headers;
}
