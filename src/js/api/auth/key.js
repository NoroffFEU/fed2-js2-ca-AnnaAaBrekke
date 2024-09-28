import { API_AUTH_KEY } from "../constants.js";
import { headers } from "../headers.js";

export async function getKey(name = "SoMe-Key") {
  try {
    const accessToken = localStorage.getItem("accessToken");

    // If no accessToken is found, clear the stored API key and throw an error
    if (!accessToken) {
      console.log("No access token found. Removing stored API key.");
      localStorage.removeItem("apiKey"); // Remove the API key when not logged in
      throw new Error("Access token not found. Cannot create or use an API key.");
    }

    // Check if API key already exists in localStorage and use it if available
    const storedApiKey = localStorage.getItem("apiKey");
    if (storedApiKey) {
      console.log("Using existing API Key.");
      return storedApiKey;
    }

    // If no stored API key is found, generate a new one
    const body = {
      name: name || "Api Key",
    };

    const response = await fetch(API_AUTH_KEY, {
      headers: headers(accessToken),
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.status === 201) {
      const { data } = await response.json();
      const apiKey = data.key; // Extract the API key from the response

      // Store the new API key in localStorage for future use
      localStorage.setItem("apiKey", apiKey);

      console.log("API Key generated and stored successfully.");
      return apiKey;
    } else {
      const errorMessage = await response.text();
      throw new Error(`Failed to create API key: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error creating the API key:", error.message);
    throw error;
  }
}
