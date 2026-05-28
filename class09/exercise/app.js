import { fetchPosts, fetchUsers } from "./api.js";
import { renderUsers, renderPosts } from "./ui.js";

const loadUsersBtn = document.getElementById("load-users-btn");
const status = document.getElementById("status");
const usersContainer = document.getElementById("users-container");
const loadPostBtn = document.getElementById("load-posts-btn");
const postContainer = document.getElementById("posts-container");

let loadUser = false;

loadUsersBtn.addEventListener("click", () => {
  if (!loadUser) {
    status.textContent = "Loading users...";

    fetchUsers()
      .then((users) => {
        renderUsers(users, usersContainer);
        status.textContent = "Users loaded successfully.";
        loadUser = true;
      })
      .catch((error) => {
        status.textContent = `Fail to load users: ${error.message}`;
      });
  } else {
    usersContainer.innerHTML = "";
    status.textContent = "Click the button to load users.";
    loadUser = false;
  }
});

loadPostBtn.addEventListener("click", () => {
  fetchPosts()
    .then((posts) => {
      const sameUserPost = posts.filter((post) => post.userId === 2);
      renderPosts(sameUserPost, postContainer);
    })
    .catch((error) => {
      status.textContent = `Fail to load post: ${error.message}`;
    });
});
