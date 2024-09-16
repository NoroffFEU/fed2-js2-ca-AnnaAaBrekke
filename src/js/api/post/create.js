import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";
import { displayPost } from "../../router/views/post.js";

export async function createPost({
  title,
  body = "",
  tags = "",
  media = null,
}) {
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

    const response = await fetch(API_SOCIAL_POSTS, {
      method: "POST",
      headers: headers(accessToken),
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to create post: ${errorMessage}`);
    }

    const { data } = await response.json();
    displayPost(data); // Display the newly created post immediately on the homepage
    return data; // Return the newly created post data
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}
