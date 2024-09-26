document.addEventListener("DOMContentLoaded", () => {
  const notFoundContainer = document.getElementById("not-found-container");

  if (!notFoundContainer) {
    console.error("404 Error - Not Found container missing from the page.");
    return;
  }

  const heading = document.createElement("h1");
  heading.textContent = "404 - Page Not Found";
  notFoundContainer.appendChild(heading);

  const description = document.createElement("p");
  description.textContent =
    "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.";
  notFoundContainer.appendChild(description);

  const homeLink = document.createElement("a");
  homeLink.href = "/";
  homeLink.textContent = "Return to Homepage";
  notFoundContainer.appendChild(homeLink);

  // Optionally log the 404 error in the console for debugging
  console.error("404 Error - Page Not Found: " + window.location.href);

  // Redirects the user to the homepage after a delay
  setTimeout(() => {
    window.location.href = "/";
  }, 5000);
});
