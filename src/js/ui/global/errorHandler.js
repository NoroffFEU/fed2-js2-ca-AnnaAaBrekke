export function showError(message) {
  const errorContainer = document.createElement("div");
  errorContainer.className = "error-message";
  errorContainer.textContent = message;

  document.body.appendChild(errorContainer);

  setTimeout(() => {
    document.body.removeChild(errorContainer);
  }, 3000);
}
