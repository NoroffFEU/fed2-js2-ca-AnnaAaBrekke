// import { showErrorAlert } from "../../ui/global/alertHandler";

// showErrorAlert("Page cannot be found in /src/views");


// chatgpt:
// document.addEventListener("DOMContentLoaded", () => {
//   const notFoundContainer = document.getElementById('not-found-container');

//   // Create an h1 element for the 404 title
//   const heading = document.createElement('h1');
//   heading.textContent = '404 - Page Not Found';
//   notFoundContainer.appendChild(heading);

//   // Create a paragraph element with a description message
//   const description = document.createElement('p');
//   description.textContent = 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.';
//   notFoundContainer.appendChild(description);

//   // Create a link element to redirect users back to the homepage
//   const homeLink = document.createElement('a');
//   homeLink.href = '/'; // Change this to your actual homepage URL if necessary
//   homeLink.textContent = 'Return to Homepage';
//   notFoundContainer.appendChild(homeLink);

//   // Optionally log the 404 error in the console for debugging
//   console.error('404 Error - Page Not Found: ' + window.location.href);

//   // Optionally, redirect the user to the homepage after a delay
//   setTimeout(() => {
//       window.location.href = '/';
//   }, 5000); // Redirect after 5 seconds
// });

// Express.js file:
// const path = require('path');
// const express = require('express');
// const app = express();

// // Other routes
// app.get('/', (req, res) => {
//     res.send('Welcome to the homepage');
// });

// // Catch-all for 404 errors
// app.use((req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
// });

// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });

