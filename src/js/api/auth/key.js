import { API_AUTH_KEY } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Retrieves or generates an API key. If an API key is already stored in
 * localStorage, it will be returned. If not, a new API key is generated using
 * the provided access token.
 *
 * @param {string} [name="API Key"] - The name to associate with the API key.
 * @returns {Promise<string>} - The API key, either retrieved from localStorage or generated.
 * @throws {Error} If accessToken is not found or if the API key creation fails.
 */
export async function getKey(name = "API Key") {
  try {
    // Check if the API key is already in localStorage
    const storedApiKey = localStorage.getItem("apiKey");
    if (storedApiKey) {
      return storedApiKey;
    }

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error(
        "Access token not found. Please log in to create an API key.",
      );
    }

    const body = { name };

    const response = await fetch(API_AUTH_KEY, {
      headers: headers(accessToken),
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.status === 201) {
      const { data } = await response.json();
      const apiKey = data.key;

      // Store the newly created API key in localStorage
      localStorage.setItem("apiKey", apiKey);

      return apiKey;
    } else {
      const errorMessage = await response.text();
      throw new Error(`Failed to create API key: ${errorMessage}`);
    }
  } catch (error) {
    console.error(`Error creating the API key: ${error.message}`);
    throw error;
  }
}
