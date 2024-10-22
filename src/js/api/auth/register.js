import { API_AUTH_REGISTER } from "../constants.js";
import { headers } from "../headers.js";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../../ui/global/alertHandler.js";

/**
 * Registers a new user by sending their details to the API.
 * On success, shows a success alert and redirects the user to the login page.
 *
 * @param {Object} userData - The user's registration details.
 * @param {string} userData.name - The user's name.
 * @param {string} userData.email - The user's email address.
 * @param {string} userData.password - The user's password (must be at least 8 characters).
 * @returns {Promise<void>} - Resolves if the registration is successful and the user is redirected.
 * @throws {Error} - Throws an error if the registration request fails or there is a network error.
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
    showSuccessAlert("Registration successful! Redirecting to login...");
    setTimeout(() => {
      window.location.href = "/auth/login/";
    }, 1500);
  } else {
    const errorMessage = await response.text();
    showErrorAlert(`Register failed: ${errorMessage}`);
    throw new Error(`Registration failed: ${errorMessage}`);
  }
}
