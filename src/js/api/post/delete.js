import { API_SOCIAL_POSTS } from "../constants.js";
import { headers } from "../headers.js";

export async function deletePost(id) {
  try {

    const accessToken = localStorage.getItem("accessToken"); // Ensure accessToken is fetched correctly

    const url = `${API_SOCIAL_POSTS}/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: headers(accessToken),
    });

    if (response.status === 204) {
      console.log("Post with id ${id} deleted.");
    } else {
      console.error("Failed to delete post with id ${id}.");
    }
  } catch (error) {
    console.error("Error deleting post with id ${id}", error);
  }
}
