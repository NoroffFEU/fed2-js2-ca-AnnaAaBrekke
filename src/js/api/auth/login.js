import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { API_AUTH_LOGIN } from "../constants.js";
import { headers } from "../headers.js";

export async function login({ email, password }) {
  const body = {
    email,
    password,
  };

  console.log("Login request body:", body); // Log the request body

  try {
    const response = await fetch(API_AUTH_LOGIN, {
      headers: headers(),
      method: "POST",
      body: JSON.stringify(body),
    });

    console.log("Login response status:", response.status); // Log the response status

    if (response.ok) {
      const { data } = await response.json();
      const { accessToken: token, ...user } = data;

      console.log("Login successful, token:", token); // Log the token on success

      // Store token and user information in localStorage
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      return data;
    }

    // Handle non-OK response
    const errorMessage = await response.text();
    console.error(`Login failed: ${errorMessage}`); // Log the error message
    showErrorAlert(`Login failed: ${errorMessage}`);
    throw new Error(`Login failed: ${errorMessage}`);
  } catch (error) {
    console.error("Login error:", error.message); // Log any caught errors
    throw error;
  }
}
