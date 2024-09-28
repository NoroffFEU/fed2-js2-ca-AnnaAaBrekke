import { API_AUTH_KEY } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Retrieves or generates an API key. If an API key is already stored in
 * localStorage, it will be returned. If not, a new API key is generated using
 * the provided access token.
 *
 * @param {string} [name="SoMe-Key"] - The name to associate with the API key.
 * @returns {Promise<string>} - The API key, either retrieved from localStorage or generated.
 * @throws {Error} If accessToken is not found or if the API key creation fails.
 */
export async function getKey(name = "SoMe-Key") {
  try {
    const storedApiKey = localStorage.getItem("apiKey");
    if (storedApiKey) {
      return storedApiKey;
    }

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error(
        "Access token not found. Cannot create or use an API key."
      );
    }

    const body = { name: name || "Api Key" };

    const response = await fetch(API_AUTH_KEY, {
      headers: headers(accessToken),
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.status === 201) {
      const { data } = await response.json();
      const apiKey = data.key;

      localStorage.setItem("apiKey", apiKey);

      return apiKey;
    } else {
      const errorMessage = await response.text();
      throw new Error(`Failed to create API key: ${errorMessage}`);
    }
  } catch (error) {
    throw new Error(`Error creating the API key: ${error.message}`);
  }
}
