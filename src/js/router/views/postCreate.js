// import FormHandler from "../../ui/auth/formHandler.js"; // Make sure this path is correct for FormHandler.js
// import { createPost } from "../../api/post/create.js"; // Import createPost from its correct location
// import { authGuard } from "../../utilities/authGuard.js";
// import { setLogoutListener } from "../../ui/global/logout.js";
// import { hideLoader, showLoader } from "../../ui/global/loader.js";

// document.addEventListener("DOMContentLoaded", () => {
//   showLoader();
//   authGuard();
//   setLogoutListener();
//   // Initialize FormHandler for the createPost form
//   FormHandler.initialize("#createPostForm", (event, form) =>
//     FormHandler.handleSubmit(event, form, createPost)
//   );
//   hideLoader();
// });

import FormHandler from "../../ui/auth/formHandler.js"; // Ensure the path is correct
import PostService from "../../api/post/postService.js";
import { authGuard } from "../../utilities/authGuard.js";
import { hideLoader, showLoader } from "../../ui/global/loader.js";

const postService = new PostService(); // Create an instance of PostService

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded"); // Ensure that the script is running

  showLoader();
  authGuard();

  const form = document.querySelector("#createPostForm");
  console.log("Form found:", form !== null); // Ensure the form is found

  if (form) {
    console.log("Attaching form submit event listener"); // Debugging line
    // Initialize FormHandler for the createPost form
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission behavior (page reload)
      console.log("Form submit event triggered."); // Ensure the submit event is triggered

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries()); // Convert form data to an object
      console.log("Form data:", data); // Log the form data

      try {
        // Create post by invoking PostService.createPost
        const result = await postService.createPost(data);
        console.log("Post created successfully:", result); // Log the result

        // Optionally redirect to the newly created post
        window.location.href = `/post/?id=${result.id}`;
      } catch (error) {
        console.error("Error creating post:", error);
      }
    });
  } else {
    console.error("Form with ID '#createPostForm' not found!");
  }

  hideLoader();
});
