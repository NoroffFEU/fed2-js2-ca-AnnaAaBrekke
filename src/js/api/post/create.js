import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js"; 

export async function createPost({
  title,
  body = "",
  tags = [],
  media = null,
}) {
  const postData = {
    title,
    body,
    tags,
    media,
  };

  try {
    const response = await fetch(API_SOCIAL_POSTS, {
      headers: headers(),
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Retrieve detailed error message if available
      throw new Error(`Failed to create post: ${errorMessage}`);
    }

    const { data } = await response.json();
    return data; // Return the newly created post data
  } catch (error) {
    console.error("Error creating post:", error); // Log any errors to the console
    throw error;
  }
}
