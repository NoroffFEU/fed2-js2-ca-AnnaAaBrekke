export function getContainerId() {
  const url = window.location.pathname;
  if (url.includes("/profile/")) {
    return "postContainerProfile";
  } else if (url.includes("/post/create/")) {
    return "createPostsContainer";
  }
  
  return "homePostsContainer";
}
