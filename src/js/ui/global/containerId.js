export function getContainerId() {
  const url = window.location.pathname;
  if (url.includes("/profile")) {
    return "postContainerProfile";
  }
  return "homePostsContainer";
}
