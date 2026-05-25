// DOM loading
const btnLoadUser = document.getElementById("load-user");
const btnClear = document.getElementById("clear");
const status = document.getElementById("status");
const output = document.getElementById("output");
const searchInput = document.getElementById("searchField");
const btnSearch = document.getElementById("searchBtn");

//SET STATUS
const setStatus = function (message, type) {
  status.textContent = message;
  if (type) {
    status.classList.add(type);
  }
};

// CLEAR DASHBOARD
const clearDashboard = function () {
  output.innerHTML = "";
  status.textContent = "Ready";
  searchInput.value = "";
};

// FETCH USERS
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

// FETCH POSTS
const loadPostsForUser = function (user) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => console.log(`Fail to load user: ${error.message}`));
};

//RENDER UI

// RENDER USER CARDS
const renderUserCard = function (user) {
  output.insertAdjacentHTML(
    "beforeend",
    `
    <div class="col" id="card-${user.id}">
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

// RENDER POSTS
const renderPosts = function (posts, postContainer) {
  postContainer.innerHTML = posts
    .map(
      (post) => `
    <div class="border rounded p-2 mt-2 bg-light">
        <strong class="small">${post.title}</strong>
        <p class="mb-0">${post.body}</p>
    </div>
  `,
    )
    .join("");
};

// ATTACH LOAD POST BUTTION
const attachLoadPostButton = function (user) {
  const btn = document.getElementById(`loadPost-${user.id}`);
  const postContainer = document.getElementById(`post-${user.id}`);

  btn.addEventListener("click", () => {
    btn.disabled = true;
    loadPostsForUser(user).then((posts) => {
      renderPosts(posts, postContainer);
      setStatus("Posts loaded", "");
      btn.disabled = false;
    });
  });
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
        setStatus("Not found", "");
      } else {
        renderUserCard(user);
        attachLoadPostButton(user);
      }
    });
});

//DISPLAY ALL USERS
btnLoadUser.addEventListener("click", () => {
  setStatus("Loading users", "");
  output.innerHTML = "";
  setTimeout(() => {
    loadUsers().then((users) => {
      users.forEach((user) => {
        renderUserCard(user);
        attachLoadPostButton(user);
      });
      setStatus("Loading completed", "");
    });
  }, 1000);
});

btnClear.addEventListener("click", () => {
  clearDashboard();
});
