import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";
import { displayPost } from "../../router/views/home.js";

export async function createPost({
  title,
  body = "",
  tags = "",
  media = {},
}) {
  const postTags = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  // Ensure media object is structured properly
  const postMedia = media && media.url ? { url: media.url, alt: media.alt } : null;

  const postData = {
    title,
    body,
    tags: postTags,
    media: postMedia,
  };

  try {
    const accessToken = localStorage.getItem("accessToken"); // Ensure accessToken is fetched correctly

    if (!accessToken) {
      showError("Access token not found. Please log in again."); // Show error message
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

    // Store the newly created post in localStorage
    const saveCreatedPosts =
      JSON.parse(localStorage.getItem("createdPosts")) || [];
    saveCreatedPosts.push(data);
    localStorage.setItem("createdPosts", JSON.stringify(saveCreatedPosts));

    displayPost(data); // Display the newly created post immediately on the homepage
    return data; // Return the newly created post data
  } catch (error) {
    console.error("Error creating post:", error);
    showError("Error creating post:"); 
    throw error;
  }
}
