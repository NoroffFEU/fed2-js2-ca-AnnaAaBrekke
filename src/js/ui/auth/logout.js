export function onLogout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  sessionStorage.removeItem("accessToken");

  window.location.href = "/auth/login/";
}
