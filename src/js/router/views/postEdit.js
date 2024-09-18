// import { authGuard } from "../../utilities/authGuard";

// authGuard();

import { readPost } from "../../api/post/read.js";
import { updatePost } from "../../api/post/update.js";
import FormHandler from "../../ui/auth/register.js";

export default class UpdatePostFormHandler {
  static initialize(formId, postId) {
    const form = document.querySelector(formId);
    if (!form) {
      console.error(`Form with ID ${formId} not found!`);
      return;
    }

    FormHandler.initialize(formId, (event) => {
      FormHandler.handleSubmit(event, form, updatePost, postId); // Pass postId for updating post
    }, updatePost);
  }
}

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);

}

async function loadPostData() {
  const postId = getQueryParam("id"); // Get the post ID from the URL

  if (!postId) {
    console.error("No post ID found in the URL");
    return;
  }

  try {
    const post = await readPost(postId);

    //Populate the form fields with the fetched content data (post)
    document.querySelector("input[name='title']").value = post.title;
    document.querySelector("textarea[name='body']").value = post.body;
    document.querySelector("input[name='tags']").value = post.tags.join(", ");
    document.querySelector("input[name='media-url']").value = post.media?.url || "";
    document.querySelector("input[name='media-alt']").value = post.media?.alt || "";


    // Form handler shoudl submit the updated post 
    UpdatePostFormHandler.initialize("#updatePostForm", postId);
  } catch (error) {
    console.error("Error fetching the post data to udate", error);  
  }
}

document.addEventListener("DOMContentLoaded", loadPostData);