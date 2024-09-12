export function onLogout() {
  // Clear JWT token from localStorage
  localStorage.removeItem("accessToken");
  console.log("Token cleared, redirecting to login."); 
  // Redirect to the login page
  window.location.href = "/auth/login/";
}
