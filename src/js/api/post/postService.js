import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";
import { authGuard } from "../../utilities/authGuard.js";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../../ui/global/alertHandler.js";

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
      console.log("Request body:", body);
      options.body = JSON.stringify(body); // Attach body if present
    }

    console.log(`Sending ${method} request to ${endpoint}`);

    try {
      const response = await fetch(endpoint, options);
      console.log("Response received:", response);

      if (response.ok) {
        if (response.status === 204) {
          console.log("No content to return (204).");
          return; // No content to return (DELETE response)
        }
        const data = await response.json();
        console.log("Data received:", data);
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
    const { title, body = "", tags = "" } = data;
    const postTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const postData = { title, body, tags: postTags };
    console.log("Creating post with data:", postData);

    const endpoint = this.apiUrl;
    const result = await this._fetchData(endpoint, "POST", postData);

    // Log the full result to inspect its structure
    console.log("Full API result:", result);

    if (result && result.data) {
      showSuccessAlert("Post created successfully!");
      console.log("Post created successfully:", result.data);
      return result.data; // Ensure that result.data contains the post ID
    } else {
      console.error("Error: No data returned from API.");
      throw new Error("No data returned from API.");
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

    console.log("Fetching posts with URL:", url);

    const result = await this._fetchData(url);
    console.log("Posts fetched successfully:", result);
    return result.data;
  }

  // UPDATE Post
  async updatePost(id, data) {
    const { title, body = "", tags = "" } = data;
    const postTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const postData = { title, body, tags: postTags };
    console.log(`Updating post with ID: ${id}, Data:`, postData);

    const endpoint = `${this.apiUrl}/${id}`;
    const result = await this._fetchData(endpoint, "PUT", postData);

    // Log the full result
    console.log("API response from updatePost:", result);

    // Return result.data since the ID might be in result.data
    return result.data; // Make sure you're returning result.data here
  }

  // DELETE Post
  async deletePost(id) {
    const endpoint = `${this.apiUrl}/${id}`;
    console.log(`Deleting post with ID: ${id}`);
    await this._fetchData(endpoint, "DELETE");
    console.log(`Post with ID ${id} deleted successfully.`);
  }

  // READ Posts By User
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
      username,
      includeAuthor: true,
    });

    const userPosts = allPosts.filter((post) => post.author.name === username);

    console.log("Posts by logged-in user fetched successfully:", allPosts); // Log the posts fetched for the user
    return userPosts;
  }
}
