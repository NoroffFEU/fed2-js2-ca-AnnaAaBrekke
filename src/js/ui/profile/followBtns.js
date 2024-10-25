import { followUser, unfollowUser } from "../../api/profile/followService";

export function followButtonsListener(username) {
  const followButton = document.getElementById("follow-btn");
  const unfollowButton = document.getElementById("unfollow-btn");

  // Re-select new buttons after cloning
  const newFollowButton = document.getElementById("follow-btn");
  const newUnfollowButton = document.getElementById("unfollow-btn");

  // Attach new event listeners
  newFollowButton.addEventListener("click", async () => {
    await followUser(username);
    updateFollowButtons(username, true); // Update button to show unfollow option
  });

  newUnfollowButton.addEventListener("click", async () => {
    await unfollowUser(username);
    updateFollowButtons(username, false); // Update button to show follow option
  });
}

export function updateFollowButtons(username, isFollowing) {
  const followButton = document.getElementById("follow-btn");
  const unfollowButton = document.getElementById("unfollow-btn");

  // Reset both buttons' visibility classes before setting the final state
  followButton.classList.remove("hidden");
  unfollowButton.classList.remove("hidden");

  // Show or hide buttons based on follow status
  if (isFollowing) {
    followButton.classList.add("hidden"); // Hide follow
    unfollowButton.classList.remove("hidden"); // Show unfollow
  } else {
    followButton.classList.remove("hidden"); // Show follow
    unfollowButton.classList.add("hidden"); // Hide unfollow
  }
}
