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
