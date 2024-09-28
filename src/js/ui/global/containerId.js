/**
 * Determines the container ID based on the current URL path.
 * 
 * @returns {string} - The ID of the container element corresponding to the current page.
 */
export function getContainerId() {
  const url = window.location.pathname;
  if (url.includes("/profile/")) {
    return "postContainerProfile";
  } else if (url.includes("/post/create/")) {
    return "createPostsContainer";
  }
  
  return "homePostsContainer";
}
