import { API_AUTH_LOGIN } from "../constants.js";
import { headers } from "../headers.js";

export async function login({ email, password }) {
  const body = {
    email,
    password,
  };

  const response = await fetch(API_AUTH_LOGIN, {
    headers: headers(),
    method: "POST",
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const { data } = await response.json();
    const { accessToken: token, ...user } = data;
    // Store token and user information in localStorage
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    return data;
  }

  const errorMessage = await response.text(); // Retrieve detailed error message if available
  throw new Error(`Login failed: ${errorMessage}`);
}
