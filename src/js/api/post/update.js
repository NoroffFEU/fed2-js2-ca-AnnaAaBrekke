import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

// Function to update a post
export async function updatePost(
  id,
  { title, body = "", tags = ""}
) {
  const postTags = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  // Ensure media object is structured properly
  // const postMedia = media ? { url: media.url, alt: media.alt } : null;

  const postData = {
    title,
    body,
    tags: postTags,
    // media: postMedia,
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
    showError("Error updating posts:"); // Show error message
    throw error;
  }
}
