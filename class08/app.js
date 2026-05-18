// DOM loading
const btnLoadUser = document.getElementById("load-user");
const btnClear = document.getElementById("clear");
const status = document.getElementById("status");
const output = document.getElementById("output");
const searchInput = document.getElementById("searchField");
const btnSearch = document.getElementById("searchBtn");

//FUNCTIONS
const setStatus = function (message, type) {
  status.textContent = message;

  status.classList.remove(
    "text-bg-danger",
    "text-bg-success",
    "text-bg-warning",
  );

  if (type) {
    status.classList.add(type);
  }
};

const clearDashboard = function () {
  output.innerHTML = "";
  status.textContent = "Ready";
};

const loadUsers = function () {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => console.log(`Fail to load user: ${error.message}`));
};

const renderUserCard = function (user) {
  output.insertAdjacentHTML(
    "beforeend",
    `
    <div class="col">
      <div class="card h-100 shadow-sm bg-success-subtle">
        <div class="card-body">
          <h5 class="card-title">${user.name}</h5>
          <p>
            <strong>Email:</strong> ${user.email}
          </p>
          <p>
            <strong>Phone:</strong> ${user.phone}
          </p>
          <p>
            <strong>City:</strong> ${user.address.city}
          </p>
          <p>
            <strong>Company name:</strong> ${user.company.name}
          </p>
          <button id="loadPost-${user.id}" data-bs-toggle="collapse" data-bs-target="#post-${user.id}">Load post</button>
          <div id="post-${user.id}"></div>
        </div>
      </div>
    </div>
    `,
  );
};

const loadPostsForUsers = function (user) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${user.id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => console.log(`Fail to load user: ${error.message}`));
};

const renderPost = function (post, postContainer) {
  postContainer.innerHTML = `
        ${post.body}
    `;
};

//SEARCH USER
btnSearch.addEventListener("click", () => {
  loadUsers()
    .then((users) => {
      return users.find((user) => user.name === searchInput.value);
    })
    .then((user) => {
      output.innerHTML = "";
      if (!user) {
        setStatus("Not found", "text-bg-danger");
      } else {
        renderUserCard(user);
        const btnLoadPost = document.getElementById(`loadPost-${user.id}`);
        //   console.log(btnLoadPost);
        const postContainer = document.getElementById(`post-${user.id}`);
        //   console.log(postContainer);
        btnLoadPost.addEventListener("click", () => {
          setStatus("", "spinner-border");
          setTimeout(() => {
            loadPostsForUsers(user).then((post) => {
              renderPost(post, postContainer);
            });
            setStatus("Loading post completed", "spinner-border");
          }, 1000);
        });
      }
    });
});

//DISPLAY ALL USERS
btnLoadUser.addEventListener("click", () => {
  setStatus("", "spinner-border");
  output.innerHTML = "";
  setTimeout(() => {
    loadUsers().then((users) => {
      users.forEach((user) => {
        renderUserCard(user);
        const btnLoadPost = document.getElementById(`loadPost-${user.id}`);
        //   console.log(btnLoadPost);
        const postContainer = document.getElementById(`post-${user.id}`);
        //   console.log(postContainer);
        btnLoadPost.addEventListener("click", () => {
          setStatus("", "spinner-border");
          setTimeout(() => {
            loadPostsForUsers(user).then((post) => {
              renderPost(post, postContainer);
            });
            setStatus("Loading post completed", "spinner-border");
          }, 1000);
        });
      });
      setStatus("Loading completed", "spinner-border");
    });
  }, 1000);
});

btnClear.addEventListener("click", () => {
  clearDashboard();
});
