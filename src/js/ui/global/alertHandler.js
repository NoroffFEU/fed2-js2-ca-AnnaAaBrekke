export function showSuccessAlert(message) {
  showAlert(message, "success");
}

export function showErrorAlert(message) {
  showAlert(message, "error");
}

function showAlert(message, type) {
  const alertContainer = document.createElement("div");
  alertContainer.classList.add("alert", `alert-${type}`);
  alertContainer.textContent = message;

  document.body.appendChild(alertContainer);

  // Show the alert
  setTimeout(() => {
    alertContainer.classList.add("show");
  }, 100); // Delay to allow transition to trigger

  // Automatically hide the alert after 3 seconds
  setTimeout(() => {
    alertContainer.classList.remove("show");
    alertContainer.classList.add("fade-out");
  }, 3000); // Time before the alert starts to fade out

  // Remove the alert from DOM after the fade-out animation
  setTimeout(() => {
    alertContainer.remove();
  }, 4000); // 1 second after the fade-out starts (to fully complete)
}

