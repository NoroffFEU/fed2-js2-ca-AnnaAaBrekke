import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";
import { displayPost } from "../../router/views/posts.js";
import { authGuard } from "../../utilities/authGuard.js"; // Import authGuard

export async function createPost({ title, body = "", tags = "" }) {
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
    userId: localStorage.getItem("userId"), // might remove later
  };

  try {
    const accessToken = localStorage.getItem("accessToken"); // Access token already validated by authGuard

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
    showErrorAlert("Error creating post:");
    throw error;
  }
}
