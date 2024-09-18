import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

// Function to update a post
export async function updatePost(id, { title, body = "", tags = "", media = null }) {
  const postTags = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  const postData = {
    title,
    body,
    tags: postTags,
    media,
  };

  try {
    const accessToken = localStorage.getItem("accessToken"); // Ensure accessToken is fetched correctly

    if (!accessToken) {
      throw new Error("Access token not found. Please log in again.");
    }

    const url = `${API_SOCIAL_POSTS}/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: headers(accessToken),
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to update post: ${errorMessage}`);
    }

    const { data } = await response.json();
    return data; // Return the updated post data
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}
