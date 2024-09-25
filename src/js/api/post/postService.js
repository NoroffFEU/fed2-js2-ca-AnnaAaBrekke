import { API_SOCIAL_POSTS } from "../constants.js"; // Using the API constant
import { headers } from "../headers.js";
import { authGuard } from "../../utilities/authGuard.js";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../../ui/global/alertHandler.js";
import { displayPost } from "../../router/views/posts.js";

export default class PostService {
  constructor() {
    this.apiUrl = API_SOCIAL_POSTS;
  }

  // Generic method to handle API requests
  async _fetchData(endpoint, method = "GET", body = null) {
    if (!authGuard()) {
      return; // If not authenticated, exit early
    }

    const accessToken = localStorage.getItem("accessToken");
    console.log("Access token retrieved:", accessToken); // Log the access token

    const options = {
      method,
      headers: headers(accessToken),
    };

    if (body) {
      console.log("Request body:", body); // Log the body being sent in the request
      options.body = JSON.stringify(body); // Attach body if present
    }

    console.log(`Sending ${method} request to ${endpoint}`); // Log the request details

    try {
      const response = await fetch(endpoint, options);
      console.log("Response received:", response); // Log the full response

      if (response.ok) {
        if (response.status === 204) {
          console.log("No content to return (204).");
          return; // No content to return (DELETE response)
        }
        const data = await response.json();
        console.log("Data received:", data); // Log the data received
        return data;
      } else {
        const errorMessage = await response.text();
        console.error(
          `Failed to ${
            method === "GET" ? "fetch" : "perform"
          } operation: ${errorMessage}`
        );
        throw new Error(
          `Failed to ${
            method === "GET" ? "fetch" : "perform"
          } operation: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Error in API request:", error);
      showErrorAlert(`Error: ${error.message}`);
      throw error;
    }
  }

  // CREATE Post
  async createPost(data) {
    try {
      const { title, body = "", tags = "" } = data; // Destructure from the data object
      const postTags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
      const postData = { title, body, tags: postTags };
      console.log("Creating post with data:", postData); // Log the post data being sent

      const endpoint = this.apiUrl;
      const result = await this._fetchData(endpoint, "POST", postData);

      if (result && result.data) {
        showSuccessAlert("Post created successfully!");
        console.log("Post created successfully:", result.data);
        return result.data;
      } else {
        console.error("Error: No data returned from API.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      showErrorAlert(
        "An error occurred while creating the post. Please try again."
      );
    }
  }

  // READ Posts (multiple posts or by ID)
  async fetchPosts({
    id = null,
    limit = 12,
    page = 1,
    tag = "",
    sort = "",
    username = "",
    includeAuthor = true,
  } = {}) {
    let url = this.apiUrl;
    const queryParams = new URLSearchParams();

    if (id) {
      url += `/${id}`;
    } else {
      queryParams.append("limit", limit.toString());
      queryParams.append("page", page.toString());
      if (tag) queryParams.append("_tag", tag);
      if (sort) queryParams.append("sort", sort);
      if (username) queryParams.append("author", username);
      if (includeAuthor) queryParams.append("_author", "true");

      url += `?${queryParams.toString()}`;
    }

    console.log("Fetching posts with URL:", url); // Log the URL being used for fetching posts

    const result = await this._fetchData(url);
    console.log("Posts fetched successfully:", result); // Log the result of the GET request
    return result.data;
  }

  // UPDATE Post
  async updatePost(id, { title, body = "", tags = "" }) {
    const postTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const postData = { title, body, tags: postTags };
    console.log(`Updating post with ID: ${id}, Data:`, postData); // Log the post data being sent for update
    const endpoint = `${this.apiUrl}/${id}`;

    const result = await this._fetchData(endpoint, "PUT", postData);
    showSuccessAlert("Post updated successfully!");
    console.log("Post updated successfully:", result); // Log the result of the PUT request
    return result.data;
  }

  // DELETE Post
  async deletePost(id) {
    const endpoint = `${this.apiUrl}/${id}`;
    console.log(`Deleting post with ID: ${id}`); // Log the post ID being deleted
    await this._fetchData(endpoint, "DELETE");
    console.log(`Post with ID ${id} deleted successfully.`); // Log success message for delete operation
  }

  // **READ Posts by Logged-In User**
  async readPostsByUser({ limit = 12, page = 1, tag = "", sort = "" } = {}) {
    if (!authGuard()) {
      return; // If not authenticated, exit early
    }

    // Fetch user information from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user?.name;
    console.log("Logged in username:", username); // Log the username of the logged-in user

    if (!username) {
      throw new Error("User not logged in. Please log in to view your posts.");
    }

    // Fetch posts authored by the logged-in user
    const allPosts = await this.fetchPosts({
      limit,
      page,
      tag,
      sort,
      username, // Pass the logged-in user's username to filter posts
      includeAuthor: true,
    });

    const userPosts = allPosts.filter((post) => post.author.name === username);

    console.log("Posts by logged-in user fetched successfully:", allPosts); // Log the posts fetched for the user
    return userPosts;
  }
}
