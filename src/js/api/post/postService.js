import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";
import { authGuard } from "../../utilities/authGuard.js";
import { showSuccessAlert } from "../../ui/global/alertHandler.js";

export default class PostService {
  constructor() {
    this.apiUrl = API_SOCIAL_POSTS;
  }

  /**
   * Generic method to handle API requests.
   *
   * @param {string} endpoint - The API endpoint URL.
   * @param {string} [method="GET"] - The HTTP method (GET, POST, PUT, DELETE).
   * @param {Object} [body=null] - The request body for POST and PUT requests.
   * @returns {Promise<Object>} - The API response data.
   * @throws {Error} If the request fails or an HTTP error occurs.
   */
  async _fetchData(endpoint, method = "GET", body = null) {
    if (!authGuard()) {
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    const options = {
      method,
      headers: headers(accessToken),
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(endpoint, options);

      if (response.ok) {
        if (response.status === 204) {
          return;
        }
        return await response.json();
      } else {
        const errorMessage = await response.text();

        if (response.status === 403) {
          throw new Error("You do not have permission to perform this action because this is not your post.");
        }

        throw new Error(
          `Failed to ${
            method === "GET" ? "fetch" : "perform"
          } operation: ${errorMessage}`
        );
      }
    } catch (error) {
      throw new Error(`Error in API request: ${error.message}`);
    }
  }

  /**
   * Creates a new post.
   *
   * @param {Object} data - The post data.
   * @param {string} data.title - The title of the post.
   * @param {string} [data.body=""] - The content of the post.
   * @param {string} [data.tags=""] - A comma-separated list of tags for the post.
   * @returns {Promise<Object>} - The created post data.
   * @throws {Error} If the post creation fails.
   */
  async createPost(data) {
    const { title, body = "", tags = "" } = data;
    const postTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const postData = { title, body, tags: postTags };

    const endpoint = this.apiUrl;
    const result = await this._fetchData(endpoint, "POST", postData);

    if (result && result.data) {
      showSuccessAlert("Post created successfully!");
      return result.data;
    } else {
      throw new Error("No data returned from API.");
    }
  }

  /**
   * Fetches posts, either all posts or by ID.
   *
   * @param {Object} [options={}] - The query parameters for the request.
   * @param {string} [options.id=null] - The ID of the specific post to fetch.
   * @param {number} [options.limit=null] - The number of posts to fetch.
   * @param {number} [options.page=1] - The page number for paginated results.
   * @param {string} [options.tag=""] - The tag to filter posts by.
   * @param {string} [options.sort=""] - The sort order of the posts.
   * @param {string} [options.username=""] - The author's username to filter posts by.
   * @param {boolean} [options.includeAuthor=true] - Whether to include author details in the response.
   * @returns {Promise<Array>} - The list of fetched posts.
   * @throws {Error} If the fetch operation fails.
   */
  async fetchPosts({
    id = null,
    limit = null,
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
      if (limit) queryParams.append("limit", limit.toString());
      if (tag) queryParams.append("_tag", tag);
      if (sort) queryParams.append("sort", sort);
      if (username) queryParams.append("author", username);
      if (includeAuthor) queryParams.append("_author", "true");

      url += `?${queryParams.toString()}`;
    }

    const result = await this._fetchData(url);
    return result.data;
  }

  /**
   * Updates an existing post.
   *
   * @param {string} id - The ID of the post to update.
   * @param {Object} data - The updated post data.
   * @param {string} data.title - The updated title of the post.
   * @param {string} [data.body=""] - The updated content of the post.
   * @param {string} [data.tags=""] - A comma-separated list of updated tags for the post.
   * @returns {Promise<Object>} - The updated post data.
   * @throws {Error} If the update operation fails.
   */
  async updatePost(id, data) {
    const { title, body = "", tags = "" } = data;
    const postTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const postData = { title, body, tags: postTags };

    const endpoint = `${this.apiUrl}/${id}`;
    const result = await this._fetchData(endpoint, "PUT", postData);

    return result.data;
  }

  /**
   * Deletes a post.
   *
   * @param {string} id - The ID of the post to delete.
   * @returns {Promise<void>} - Resolves when the post is deleted.
   * @throws {Error} If the delete operation fails.
   */
  async deletePost(id) {
    const endpoint = `${this.apiUrl}/${id}`;
    await this._fetchData(endpoint, "DELETE");
  }

  /**
   * Fetches posts created by the logged-in user.
   *
   * @param {Object} [options={}] - The query parameters for the request.
   * @param {number} [options.limit=null] - The number of posts to fetch.
   * @param {number} [options.page=1] - The page number for paginated results.
   * @param {string} [options.tag=""] - The tag to filter posts by.
   * @param {string} [options.sort=""] - The sort order of the posts.
   * @returns {Promise<Array>} - The list of posts created by the logged-in user.
   * @throws {Error} If the user is not logged in or the fetch operation fails.
   */
  async readPostsByUser({ limit = null, page = 1, tag = "", sort = "" } = {}) {
    if (!authGuard()) {
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const username = user?.name;

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

    return allPosts.filter((post) => post.author.name === username);
  }
}
