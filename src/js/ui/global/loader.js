export function showLoader() {
  const loader = document.getElementById("loadingInd");
  if (loader) {
    loader.classList.remove("hidden");
    loader.classList.add("flex");
  } else {
    console.error("Loader element not found");
  }
}

export function hideLoader() {
  const loader = document.getElementById("loadingInd");
  if (loader) {
    loader.classList.add("hidden");
    loader.classList.remove("flex");
  } else {
    console.error("Loader element not found");
  }
}
