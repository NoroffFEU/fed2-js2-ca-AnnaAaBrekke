import { API_KEY } from "./constants.js";

export function headers(accessToken = "") {
  const headers = new Headers();

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  if (accessToken) {
    headers.append("Authorization", `Bearer ${accessToken}`); // Use backticks for string interpolation
  }

  // Include "Content-Type" header by default
  headers.append("Content-Type", "application/json");

  return headers;
}
