// import { router } from "./js/router/index.js";
import { setLogoutListener } from "./js/ui/global/logout.js";

// await router(window.location.pathname);

// import as posts from "../post/index.js"
// posts.createpost/update.. (if i have index.file where i export everythihg)

document.addEventListener("DOMContentLoaded", () => {
  // Check if the logout button exists in the DOM before setting the listener
  if (document.getElementById("logout-button")) {
    setLogoutListener(); // Initialize the logout button listener only if the button exists
  }
});
