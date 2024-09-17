import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

// Function to fetch all posts
export async function fetchPosts({
  id = null,
  limit = 12,
  page = 1,
  tag = "",
} = {}) {
  try {
    // Retrieve the access token from localStorage
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found. Please log in again.");
    }

    // Construct the base URL for fetching posts
    let url = API_SOCIAL_POSTS;
    const queryParams = new URLSearchParams();

    // If fetching a single post by ID, adjust the URL and append additional parameters
    if (id) {
      url += `/${id}`;
    } else {
      // Otherwise, handle fetching multiple posts with pagination and filtering
      queryParams.append("limit", limit.toString());
      queryParams.append("page", page.toString());
      if (tag) queryParams.append("_tag", tag);
    }

    // Append query parameters to the URL
    url += `?${queryParams.toString()}`;

    // Fetch posts from the API endpoint
    const response = await fetch(url, {
      method: "GET",
      headers: headers(accessToken), // Include the Authorization header
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch posts: ${errorMessage}`);
    }

    const result = await response.json();

    return result.data; // Return the fetched data (single post or array of posts)
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error; // Re-throw the error for the caller to handle if necessary
  }
}

export async function readPosts(limit = 12, page = 1, tag = "") {
  return fetchPosts({ limit, page, tag });
}

export async function readPost(id) {
  return fetchPosts({ id });
}



// export async function readPostsByUser(username, limit = 12, page = 1, tag) {}
