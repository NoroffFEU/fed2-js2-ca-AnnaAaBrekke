import { API_AUTH_REGISTER } from "../constants.js";

export async function register({
  name,
  email,
  password,
  bio,
  banner,
  avatar,
}) {
  const body = JSON.stringify({
    name,
    email,
    password,
    bio,
    banner,
    avatar,
  });

  const response = await fetch(API_AUTH_REGISTER, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body,
  });

  if (response.ok) {
    const { data } = await response.json();
    // Store JWT token in localStorage
    localStorage.setItem("token", data.token);
    return data;
  }

  // Handle error and display appropriate error message
  throw new Error("Could not register account")
}
