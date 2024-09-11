import { API_AUTH_REGISTER } from "../constants.js";

export async function register({ name, email, password }) {
  const body = JSON.stringify({
    name,
    email,
    password,
  });

  const response = await fetch(API_AUTH_REGISTER, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body,
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
  throw new Error("Could not register account");
}
