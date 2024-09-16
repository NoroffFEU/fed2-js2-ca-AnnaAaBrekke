import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

// export async function readPost(id) {}

// Function to fetch all posts
export async function readPosts(limit = 12, page = 1, tag = "") {
  try {
    // Retrieve the access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token not found. Please log in again.");
    }

    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
    });

    if (tag) {
      queryParams.append("_tag", tag);
    }

    // Fetch all posts from the API endpoint
    const response = await fetch(API_SOCIAL_POSTS, {
      method: "GET",
      headers: headers(accessToken), // Include the Authorization header
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch posts: ${errorMessage}`);
    }

    const result = await response.json();

    // Extract posts data from the response
    const posts = result.data;

    return posts; // Return the array of posts
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error; // Re-throw the error for the caller to handle if necessary
  }
}


// export async function readPostsByUser(username, limit = 12, page = 1, tag) {}
