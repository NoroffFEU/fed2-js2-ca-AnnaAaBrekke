// import { API_SOCIAL_POSTS } from "../constants.js";
// import { headers } from "../headers.js";
// import { displayPost } from "../../router/views/posts.js";
// import { authGuard } from "../../utilities/authGuard.js"; // Import authGuard
// import { showErrorAlert } from "../../ui/global/alertHandler.js"; // Ensure error alert shows properly

// export async function createPost({ title, body = "", tags = "" }) {
//   if (!authGuard()) return; // Exit if not authenticated

//   // Prepare the tags array from the comma-separated string
//   const postTags = tags
//     .split(",")
//     .map((tag) => tag.trim())
//     .filter((tag) => tag.length > 0);

//   // Construct the post data object
//   const postData = {
//     title,
//     body,
//     tags: postTags,
//   };

//   try {
//     const accessToken = localStorage.getItem("accessToken"); // Access token already validated by authGuard

//     // Make the POST request to create the post
//     const response = await fetch(API_SOCIAL_POSTS, {
//       method: "POST",
//       headers: headers(accessToken),
//       body: JSON.stringify(postData),
//     });

//     if (!response.ok) {
//       const errorMessage = await response.text();
//       throw new Error(`Failed to create post: ${errorMessage}`);
//     }

//     // Parse the API response
//     const { data } = await response.json();
//     console.log("Created post data:", data);

//     // Display the newly created post immediately on the homepage or relevant UI
//     displayPost(data);
    
//     // Return the created post data
//     return data;
//   } catch (error) {
//     // Handle error and display alert
//     console.error("Error creating post:", error);
//     showErrorAlert("Error creating post. Please try again later.");
//     throw error;
//   }
// }
