import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";
import { authGuard } from "../../utilities/authGuard.js";
import { showSuccessAlert } from "../../ui/global/alertHandler.js";

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
    console.log("Access token retrieved:", accessToken);

    const options = {
      method,
      headers: headers(accessToken),
    };

    if (body) {
      console.log("Request body:", body);
      options.body = JSON.stringify(body);
    }

    console.log(`Sending ${method} request to ${endpoint}`);

    try {
      const response = await fetch(endpoint, options);
      console.log("Response received:", response);

      if (response.ok) {
        if (response.status === 204) {
          console.log("No content to return (204).");
          return;
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

        // Custom handling for specific HTTP status codes
        if (response.status === 403) {
          throw new Error("You do not have permission to perform this action.");
        }

        throw new Error(
          `Failed to ${
            method === "GET" ? "fetch" : "perform"
          } operation: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Error in API request:", error);
      throw error; // Now throw the error back to be handled by the caller
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
    limit = null, // Test with limit removed or set to a high number like 1000
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
      queryParams.append("page", page.toString());
      if (limit) queryParams.append("limit", limit.toString()); // Include only if limit is set
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

    console.log("API response from updatePost:", result);

    return result.data;
  }

  // DELETE Post
  async deletePost(id) {
    const endpoint = `${this.apiUrl}/${id}`;
    console.log(`Deleting post with ID: ${id}`);
    await this._fetchData(endpoint, "DELETE");
    console.log(`Post with ID ${id} deleted successfully.`);
  }

  async readPostsByUser({ limit = null, page = 1, tag = "", sort = "" } = {}) {
    if (!authGuard()) {
      return; // If not authenticated, exit early
    }

    // Fetch user information from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user?.name;
    console.log("Logged in username:", username); // Check if this is correct

    if (!username) {
      throw new Error("User not logged in. Please log in to view your posts.");
    }

    const allPosts = await this.fetchPosts({
      limit,
      page,
      tag,
      sort,
      username,
      includeAuthor: true,
    });

    const userPosts = allPosts.filter((post) => post.author.name === username);

    console.log("Posts by logged-in user fetched successfully:", userPosts); // Log the posts fetched for the user
    return userPosts;
  }
}
