export function onLogout() {
  localStorage.removeItem("accessToken");
  sessionStorage.removeItem("accessToken");

  window.location.href = "/auth/login/";
}
