import { API_AUTH_LOGIN } from "../constants.js";

export async function login({ email, password }) {
  const body = {
    email,
    password,
  };

  const response = await fetch(API_AUTH_LOGIN, {
    headers: {
      "Content-Type": "application/json",
    },
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

  // Handle error and display appropriate error message
  const errorMessage = await response.text(); // Retrieve detailed error message if available
  throw new Error(`Login failed: ${errorMessage}`);
}
