import { API_AUTH_REGISTER } from "../constants.js";
import { headers } from "../headers.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";

/**
 * Registers a new user by sending their details to the API and storing the token and user info upon success.
 *
 * @param {Object} userData - The user's registration details.
 * @param {string} userData.name - The user's name.
 * @param {string} userData.email - The user's email.
 * @param {string} userData.password - The user's password.
 * @returns {Promise<Object>} - The response data containing the access token and user information.
 * @throws {Error} If the registration request fails or there is a network error.
 */
export async function register({ name, email, password }) {
  const body = {
    name,
    email,
    password,
  };

  const response = await fetch(API_AUTH_REGISTER, {
    headers: headers(),
    method: "POST",
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const { data } = await response.json();
    const { accessToken: token, ...user } = data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return data;
  }

  const errorMessage = await response.text();
  showErrorAlert(`Register failed: ${errorMessage}`);
  throw new Error(`Registration failed: ${errorMessage}`);
}
