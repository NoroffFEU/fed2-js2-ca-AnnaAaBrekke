export function showLoader() {
  const loader = document.getElementById("loadingInd");
  if (loader) {
    loader.classList.remove("hidden"); // Shows the loader
  } else {
    console.error("Loader element not found");
  }
}

export function hideLoader() {
  const loader = document.getElementById("loadingInd");
  if (loader) {
    loader.classList.add("hidden"); // Hides the loader
  } else {
    console.error("Loader element not found");
  }
}
