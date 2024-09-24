import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";
import { authGuard } from "../../utilities/authGuard.js"; // Import authGuard

// Function to update a post
export async function updatePost(id, { title, body = "", tags = "" }) {
  // Check if the user is authenticated
  if (!authGuard()) return; // Exit if not authenticated

  const postTags = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  const postData = {
    title,
    body,
    tags: postTags,
  };

  try {
    const accessToken = localStorage.getItem("accessToken"); // Access token already validated by authGuard

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
    showErrorAlert("Error updating posts:"); // Show error message
    throw error;
  }
}
