// import { router } from "./js/router/index.js";
// import { setLogoutListener } from "./js/ui/global/logout.js";

// // await router(window.location.pathname);

// // import as posts from "../post/index.js"
// // posts.createpost/update.. (if i have index.file where i export everythihg)

// document.addEventListener("DOMContentLoaded", () => {
//   // Check if the logout button exists in the DOM before setting the listener
//   if (document.getElementById("logout-button")) {
//     setLogoutListener(); // Initialize the logout button listener only if the button exists
//   }
// });

// app.js

import { getKey } from "./js/api/auth/key.js";
// import { router } from "./js/router/index.js";
import { setLogoutListener } from "./js/ui/global/logout.js";
import { showLoader, hideLoader } from "./js/ui/global/loader.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Generate and store the API key at the start of the app
    const apiKey = await getKey(); // Create and store the API key
    console.log("API Key generated and stored:", apiKey);

    // Initialize the router to handle the initial page load
    // await router(window.location.pathname);

    // Check if the logout button exists in the DOM before setting the listener
    if (document.getElementById("logout-button")) {
      setLogoutListener(); // Initialize the logout button listener only if the button exists
    }
  } catch (error) {
    console.error("Error initializing application:", error.message); // Handle error if key generation fails
  }
});

