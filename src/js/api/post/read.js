import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";
import { showErrorAlert } from "../../ui/global/alertHandler.js";
import { authGuard } from "../../utilities/authGuard.js";

// Function to fetch all posts or a specific post by ID
export async function fetchPosts({
  id = null,
  limit = 12,
  page = 1,
  tag = "",
  sort = "",
  username = "",
  includeAuthor = true,
} = {}) {
  // Check if the user is authenticated
  if (!authGuard()) return; // Exit if not authenticated

  try {
    let url = API_SOCIAL_POSTS;
    const queryParams = new URLSearchParams();

    // Fetching a single post by ID
    if (id) {
      url += `/${id}`;
    } else {
      // Fetching multiple posts with pagination, sorting, and optional filtering
      queryParams.append("limit", limit.toString());
      queryParams.append("page", page.toString());
      if (tag) queryParams.append("_tag", tag); // Filter by tag
      if (sort) queryParams.append("sort", sort); // Sort by field
      if (username) queryParams.append("author", username); // Filter by author
      if (includeAuthor) queryParams.append("_author", "true"); // Include author details
    }

    // Append query parameters to the URL
    url += `?${queryParams.toString()}`;

    const accessToken = localStorage.getItem("accessToken"); // Access token already validated by authGuard

    const response = await fetch(url, {
      method: "GET",
      headers: headers(accessToken), // Include Authorization header
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      showErrorAlert(`Error fetching posts: ${errorMessage}`); // Show detailed error message
      throw new Error(`Failed to fetch posts: ${errorMessage}`);
    }

    const result = await response.json();
    return result.data; // Return the fetched data
  } catch (error) {
    showErrorAlert(`Error fetching posts: ${error.message}`); // Show error message
    throw error; // Propagate the error
  }
}

export async function readPosts({
  limit = 12,
  page = 1,
  tag = "",
  sort = "",
  includeAuthor = true,
  // Commented out optional features for now
  // includeComments = false,
  // includeReactions = false,
} = {}) {
  return fetchPosts({
    limit,
    page,
    tag,
    sort,
    includeAuthor,
    // includeComments,
    // includeReactions,
  });
}

// Function to read a specific post by ID
export async function readPost(id) {
  return fetchPosts({
    id,
    includeAuthor: true,
    // includeComments: true, // Optional for future
    // includeReactions: true, // Optional for future
  });
}

// Function to read posts by the logged-in user
export async function readPostsByUser({
  limit = 12,
  page = 1,
  tag = "",
  sort = "",
} = {}) {
  // Check if the user is authenticated
  if (!authGuard()) return; // Exit if not authenticated

  // User object stored in localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Extract the username from the user object
  const username = user?.name;
  console.log("Logged in username:", username);

  if (!username) {
    authGuard();
    throw new Error("User not logged in. Please log in to view your posts.");
  }

  // Fetch posts by this user
  const allPosts = await fetchPosts({
    limit,
    page,
    tag,
    sort,
    includeAuthor: true,
  });

  // Filter posts by author
  const userPosts = allPosts.filter((post) => post.author.name === username);

  return userPosts;
}
