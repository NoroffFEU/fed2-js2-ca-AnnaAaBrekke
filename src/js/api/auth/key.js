// getKey.js

import { API_AUTH_KEY } from "../constants.js"; // Import the endpoint constant
import { headers } from "../headers.js"; // Import the headers utility

export async function getKey(name = "SoMe-Key") {
  try {
    // Retrieve the access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token not found. Please log in first to generate an API key.");
    }

    const body = {
      name: name, 
    };

    const response = await fetch(API_AUTH_KEY, {
      headers: headers(accessToken), 
      method: "POST",
      body: JSON.stringify(body), 
    });

    if (response.status === 201) {
      const { data } = await response.json();
      const apiKey = data.key; // Extract the API key from the response

      // Store the API key in localStorage for future use
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
