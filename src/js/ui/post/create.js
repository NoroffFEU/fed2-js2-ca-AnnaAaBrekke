import PostService from "../../api/post/postService";

const postService = new PostService(); // Create an instance of PostService

export async function onCreatePost() {
  const form = document.querySelector("#createPostForm");
  console.log("Form found:", form !== null); // Ensure the form is found

  if (form) {
    console.log("Attaching form submit event listener");
    // Initialize FormHandler for the createPost form
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("Form submit event triggered.");
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries()); // Convert form data to an object
      console.log("Form data:", data); // Log the form data

      try {
        const result = await postService.createPost(data);
        console.log("Post created successfully:", result); // Log the result

        window.location.href = `/post/?id=${result.id}`;
      } catch (error) {
        console.error("Error creating post:", error);
        showErrorAlert("Failed to create post. Please try again.");
      }
    });
  } else {
    console.error("Form with ID '#createPostForm' not found!");
  }
}
