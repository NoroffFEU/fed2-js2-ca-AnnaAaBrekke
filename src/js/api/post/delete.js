export async function deletePost(id) {
  try {
    const url = `/social/posts/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
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
