import { API_AUTH_REGISTER } from "../constants.js";
import { headers } from "../headers.js";

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

  // Handle error and display appropriate error message
  const errorMessage = await response.text(); // Retrieve detailed error message if available
  throw new Error(`Registration failed: ${errorMessage}`);
}