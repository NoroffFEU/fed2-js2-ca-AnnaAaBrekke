import { readProfile } from "../../api/profile/read";

export async function loadNavbar() {
  try {
    // Check if the user is logged in by looking for the access token
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user?.name;

    // Fetch user profile information to populate avatar and username
    const profileResponse = await readProfile(username);
    if (profileResponse && profileResponse.data) {
      const profile = profileResponse.data;

      // Set the profile avatar and username in the navbar
      document.querySelector("#profile-avatar").src = profile.avatar?.url;
      document.querySelector("#profile-username").textContent =
        profile.name || "My Profile";
    } else {
      console.error("Profile data not found.");
    }
    dropdownMenu();
  } catch (error) {
    console.error(`Error loading navbar: ${error.message}`);
  }
}

function dropdownMenu() {
  const menuDropdownToggle = document.getElementById("menu-dropdown-toggle");
  const menuDropdown = document.getElementById("menu-dropdown");

  menuDropdownToggle.addEventListener("click", () => {
    menuDropdown.classList.toggle("hidden");
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", (event) => {
    if (
      !menuDropdownToggle.contains(event.target) &&
      !menuDropdown.contains(event.target)
    ) {
      menuDropdown.classList.add("hidden");
    }
  });
}
