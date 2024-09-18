import { updatePost } from "../../api/post/update.js";

export async function onUpdatePost(event) {
  event.preventDefault();

  const postId = event.target.getAttribute("data-id");

  if (!postId) {
    console.error("No post ID is found");
    return;
  }

  try {
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const body = formData.get("body");
    const tags = formData.get("tags");
    const mediaUrl = formData.get("media-url");
    const mediaAlt = formData.get("media-alt");

    const updatedPost = {
      title,
      body,
      tags,
      media: {
        url: mediaUrl,
        alt: mediaAlt,
      },
    };

    const result = await updatePost(postId, updatedPost);

    alert("Post with id ${postId} and title ${title} is updated successfully!");

    setTimeout(() => {
      window.location.href = `/post/id=${postId}`; // CHANGE THIS TO REDIRECT TO SINGLE PAGE??
    }, 500);
  } catch (error) {
    console.error(
      "Failed to update post with title ${title} and ud ${postId}:",
      error
    );
    // alert("An error occurred while updating the post.");
  }
}
