// alert("Single Post Page");

export function displayPost(post) {
  const postsContainer = document.querySelector(".postsContainer"); // Ensure there's a container for posts

  const postElement = document.createElement("div");
  postElement.className = "post";

  // Create post content elements
  postElement.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <p><strong>Tags:</strong> ${post.tags.join(", ")}</p>
    ${
      post.media && post.media.url
        ? `<img src="${post.media.url}" alt="${post.media.alt || "Post Image"}" />`
        : ""
    }
    <p><strong>Comments:</strong> ${post._count.comments}</p>
    <p><strong>Reactions:</strong> ${post._count.reactions}</p>
  `;

  // Prepend the new post to the top of the container
  postsContainer.prepend(postElement);
}
