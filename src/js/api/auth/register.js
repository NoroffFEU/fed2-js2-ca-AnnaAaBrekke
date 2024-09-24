import { API_AUTH_REGISTER } from "../constants.js";
import { headers } from "../headers.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";

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
    // Store token and user information in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return data;
  }

  // Handle error 
  const errorMessage = await response.text();
  showErrorAlert(`Register failed: ${errorMessage}`); // Show error message
  throw new Error(`Registration failed: ${errorMessage}`);
}
