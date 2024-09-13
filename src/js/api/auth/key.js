import { API_AUTH_KEY } from "../constants";

export async function getKey(name = "SoMe-Key") {
  try {
    const response = await fetch(API_AUTH_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.status === 201) {
      const { data } = await response.json();
      return data.key;
    } else {
      throw new Error("Failed to create API key");
    }
  } catch (error) {
    console.error("Error creating the API key", error);
    throw error;
  }
}
