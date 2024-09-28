import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { API_AUTH_LOGIN } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Logs a user in by sending their credentials to the API and storing the token and user info upon success.
 *
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The user's email.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} - The response data containing the access token and user information.
 * @throws {Error} If the login request fails or there is a network error.
 */
export async function login({ email, password }) {
  const body = {
    email,
    password,
  };

  try {
    const response = await fetch(API_AUTH_LOGIN, {
      headers: headers(),
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const { data } = await response.json();
      const { accessToken: token, ...user } = data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      return data;
    }

    const errorMessage = await response.text();
    showErrorAlert(`Login failed: ${errorMessage}`);
    throw new Error(`Login failed: ${errorMessage}`);
  } catch (error) {
    throw new Error(`Login error: ${error.message}`);
  }
}
