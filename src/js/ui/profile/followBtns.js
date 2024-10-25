import { followUser, unFollowUser } from "../../api/profile/followService";

export function followButtonsListener(username) {
  const followButton = document.getElementById("follow-btn");
  const unFollowButton = document.getElementById("unfollow-btn");

  const handleFollowToggle = async (isFollowing) => {
    if (isFollowing) {
      await followUser(username);
    } else {
      await unFollowUser(username);
    }
    updateFollowButtons(isFollowing);
  };

  followButton.addEventListener("click", () => handleFollowToggle(true));
  unFollowButton.addEventListener("click", () => handleFollowToggle(false));
}

export function updateFollowButtons(isFollowing) {
  const followButton = document.getElementById("follow-btn");
  const unFollowButton = document.getElementById("unfollow-btn");

  // Toggle visibility based on follow status
  followButton.classList.toggle("hidden", isFollowing);
  unFollowButton.classList.toggle("hidden", !isFollowing);
}

// import { followUser, unFollowUser } from "../../api/profile/followService";

// export function followButtonsListener(username) {
//   const followActionButton = document.getElementById("follow-btn");
//   const unfollowActionButton = document.getElementById("unfollow-btn");

//   followActionButton.addEventListener("click", async () => {
//     await followUser(username);
//     updateFollowButtons(true);
//   });

//   unfollowActionButton.addEventListener("click", async () => {
//     await unFollowUser(username);
//     updateFollowButtons(false);
//   });
// }

// export function updateFollowButtons(isFollowing) {
//   const followActionButton = document.getElementById("follow-btn");
//   const unfollowActionButton = document.getElementById("unfollow-btn");

//   // Reset visibility classes before setting the final state
//   followActionButton.classList.remove("hidden");
//   unfollowActionButton.classList.remove("hidden");

//   // Toggle visibility based on follow status
//   if (isFollowing) {
//     followActionButton.classList.add("hidden");
//     unfollowActionButton.classList.remove("hidden");
//   } else {
//     followActionButton.classList.remove("hidden");
//     unfollowActionButton.classList.add("hidden");
//   }
// }
