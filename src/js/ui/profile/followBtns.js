import { followUser, unfollowUser } from "../../api/profile/followService";

export function followButtonsListener(username) {
  const followButton = document.getElementById("follow-btn");
  const unfollowButton = document.getElementById("unfollow-btn");

  followButton.addEventListener("click", () => {
    followUser(username);
  });

  unfollowButton.addEventListener("click", () => {
    unfollowUser(username);
  });
}

// Function to update the follow/unfollow buttons
export function updateFollowButtons(isFollowing) {
  const followButton = document.getElementById("follow-btn");
  const unfollowButton = document.getElementById("unfollow-btn");

  if (isFollowing) {
    followButton.classList.add("hidden");
    unfollowButton.classList.remove("hidden");
  } else {
    followButton.classList.remove("hidden");
    unfollowButton.classList.add("hidden");
  }
}
