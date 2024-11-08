import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";
import { authGuard } from "../../utilities/authGuard.js";
import { showSuccessAlert } from "../../ui/global/alertHandler.js";

/**
 * Service class for handling posts with the Noroff API.
 * Provides methods for creating, reading, updating, and deleting posts,
 * as well as searching and fetching posts by user.
 */
export default class PostService {
  constructor() {
    this.apiUrl = API_SOCIAL_POSTS;
  }

  /**
   * Generic method to handle API requests.
   *
   * @param {string} endpoint - The API endpoint URL.
   * @param {string} [method="GET"] - The HTTP method (GET, POST, PUT, DELETE).
   * @param {Object|null} [body=null] - The request body for POST and PUT requests.
   * @returns {Promise<Object>} - The API response data.
   * @throws {Error} If the request fails or an HTTP error occurs.
   */
  async _fetchData(endpoint, method = "GET", body = null) {
    if (!authGuard()) {
      return;
    }

    const options = {
      method,
      headers: headers(),
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
          throw new Error(
            "You do not have permission to perform this action because this is not your post.",
          );
        }

        throw new Error(
          `Failed to ${
            method === "GET" ? "fetch" : "perform"
          } operation: ${errorMessage}`,
        );
      }
    } catch (error) {
      throw new Error(`Error in API request: ${error.message}`);
    }
  }

  /**
   * Search posts by query (title or body).
   *
   * @param {string} query - The search query.
   * @returns {Promise<Array>} - The list of posts that match the query.
   * @throws {Error} If the search query is empty or if no posts are found.
   */
  async searchPosts(query) {
    if (!query || query.trim() === "") {
      throw new Error("Search query cannot be empty.");
    }

    const endpoint = `${this.apiUrl}/search?q=${encodeURIComponent(query)}&_author=true`;
    const result = await this._fetchData(endpoint);

    if (result && result.data) {
      return result.data;
    } else {
      throw new Error("No posts found for the given query.");
    }
  }

  /**
   * Creates a new post.
   *
   * @param {Object} data - The post data.
   * @param {string} data.title - The title of the post.
   * @param {string} [data.body=""] - The content of the post.
   * @param {string} [data.tags=""] - A comma-separated list of tags for the post.
   * @param {string} [data.mediaUrl=""] - The URL of the media/image.
   * @param {string} [data.mediaAlt=""] - The alt text for the media/image.
   * @returns {Promise<Object>} - The created post data.
   * @throws {Error} If the post creation fails.
   */
  async createPost(data) {
    const { title, body = "", tags = "", mediaUrl = "", mediaAlt = "" } = data;
    const postTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const postData = {
      title,
      body,
      tags: postTags,
      media: mediaUrl ? { url: mediaUrl, alt: mediaAlt || "" } : undefined,
    };

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
   * Fetches posts, either all posts or a specific post by ID.
   *
   * @param {Object} [options={}] - The query parameters for the request.
   * @param {string|null} [options.id=null] - The ID of the specific post to fetch. If provided, fetches a single post by ID.
   * @param {number|null} [options.limit=null] - The number of posts to fetch when fetching multiple posts. Ignored if fetching by ID.
   * @param {number} [options.page=1] - The page number for paginated results. Ignored if fetching by ID.
   * @param {string} [options.tag=""] - The tag to filter posts by. Only one tag can be used at a time.
   * @param {string} [options.sort=""] - The sort order for the posts (e.g., 'asc', 'desc'). Ignored if fetching by ID.
   * @param {string} [options.username=""] - The username of the post author to filter posts by. Ignored if fetching by ID.
   * @param {boolean} [options.includeAuthor=true] - Whether to include the author details in the response.
   * @returns {Promise<Object|Array>} - Returns the fetched post(s). If `id` is provided, returns a single post object, otherwise returns an array of posts.
   * @throws {Error} If the fetch operation fails due to network issues or invalid data.
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
      if (includeAuthor) queryParams.append("_author", "true");
    } else {
      queryParams.append("page", page.toString());
      if (limit) queryParams.append("limit", limit.toString());
      if (tag) queryParams.append("_tag", tag);
      if (sort) queryParams.append("sort", sort);
      if (username) queryParams.append("author", username);
      if (includeAuthor) queryParams.append("_author", "true");
    }

    if (queryParams.toString()) {
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
   * @param {string} [data.mediaUrl=""] - The URL of the updated media/image.
   * @param {string} [data.mediaAlt=""] - The alt text for the updated media/image.
   * @returns {Promise<Object>} - The updated post data.
   * @throws {Error} If the update operation fails.
   */
  async updatePost(id, data) {
    const { title, body = "", tags = "", mediaUrl = "", mediaAlt = "" } = data;
    const postTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const postData = {
      title,
      body,
      tags: postTags,
      media: mediaUrl ? { url: mediaUrl, alt: mediaAlt || "" } : undefined,
    };

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
    try {
      await this._fetchData(endpoint, "DELETE");
      return true; // Indicate successful deletion
    } catch (error) {
      throw new Error(`Failed to delete post: ${error.message}`);
    }
  }

  /**
   * Fetches posts created by a specific user.
   *
   * @param {string} username - The username of the user whose posts you want to fetch.
   * @param {Object} [options={}] - The query parameters for the request.
   * @param {number|null} [options.limit=null] - The number of posts to fetch.
   * @param {number} [options.page=1] - The page number for paginated results.
   * @param {string} [options.tag=""] - The tag to filter posts by.
   * @param {string} [options.sort=""] - The sort order of the posts.
   * @returns {Promise<Array>} - The list of posts created by the specified user.
   * @throws {Error} If the fetch operation fails.
   */
  async readPostsByUser({
    username,
    limit = null,
    page = 1,
    tag = "",
    sort = "",
  } = {}) {
    if (!authGuard()) {
      return;
    }

    if (!username) {
      throw new Error("Username is required to fetch the user's posts.");
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
