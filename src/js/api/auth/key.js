import { API_AUTH_KEY } from "../constants.js";
import { headers } from "../headers.js";
import { authGuard } from "../../utilities/authGuard.js";

export async function getKey(name = "SoMe-Key") {
  if (!authGuard()) return; // Exit if not authenticated

  try {
    const accessToken = localStorage.getItem("accessToken"); // Access token already validated by authGuard

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
