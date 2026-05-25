// ─── DOM ELEMENTS ────────────────────────────────────────────────
const btnLoadUser = document.getElementById("load-user");
const btnClear = document.getElementById("clear");
const btnSearch = document.getElementById("searchBtn");
const status = document.getElementById("status");
const output = document.getElementById("output");
const searchInput = document.getElementById("searchField");
const spinner = document.getElementById("spinner"); // ✅ add a spinner element in HTML

// ─── STATUS & LOADING ────────────────────────────────────────────
const setStatus = function (message, type) {
  status.textContent = message;
  status.classList.remove(
    "text-bg-danger",
    "text-bg-success",
    "text-bg-warning",
  );
  if (type) status.classList.add(type);
};

const setLoading = function (isLoading) {
  spinner.classList.toggle("d-none", !isLoading); // ✅ show/hide spinner
  btnLoadUser.disabled = isLoading;
  btnSearch.disabled = isLoading;
};

const clearDashboard = function () {
  output.innerHTML = "";
  status.textContent = "Ready";
  searchInput.value = "";
  status.className = "";
};

// ─── FETCH USERS ─────────────────────────────────────────────────
const loadUsers = function () {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      setStatus(`Failed to load users: ${error.message}`, "text-bg-danger");
      return []; // ✅ return empty array so .forEach doesn't crash
    });
};

// ─── FETCH POSTS ─────────────────────────────────────────────────
const loadPostsForUser = function (user) {
  // ✅ correct endpoint — fetch posts by userId
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      setStatus(`Failed to load posts: ${error.message}`, "text-bg-danger");
      return [];
    });
};

// ─── RENDER USER CARD ─────────────────────────────────────────────
const renderUserCard = function (user) {
  output.insertAdjacentHTML(
    "beforeend",
    `
        <div class="col" id="card-${user.id}">
            <div class="card h-100 shadow-sm bg-success-subtle">
                <div class="card-body">
                    <h5 class="card-title">${user.name}</h5>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <p><strong>City:</strong> ${user.address.city}</p>
                    <p><strong>Company:</strong> ${user.company.name}</p>
                    <button class="btn btn-primary btn-sm" id="loadPost-${user.id}">
                        Load Posts
                    </button>
                    <div id="post-${user.id}" class="mt-2"></div>
                </div>
            </div>
        </div>
    `,
  );
};

// ─── RENDER POSTS ─────────────────────────────────────────────────
const renderPosts = function (posts, postContainer) {
  if (posts.length === 0) {
    postContainer.innerHTML = `<p class="text-muted small mt-2">No posts found.</p>`;
    return;
  }
  // ✅ render all posts, not just one
  postContainer.innerHTML = posts
    .map(
      (post) => `
        <div class="border rounded p-2 mt-2 bg-light">
            <strong class="small">${post.title}</strong>
            <p class="mb-0 small text-muted">${post.body}</p>
        </div>
    `,
    )
    .join("");
};

// ─── ATTACH LOAD POST BUTTON ──────────────────────────────────────
// ✅ Extracted reusable function — no more code duplication
const attachLoadPostButton = function (user) {
  const btn = document.getElementById(`loadPost-${user.id}`);
  const postContainer = document.getElementById(`post-${user.id}`);

  btn.addEventListener("click", () => {
    btn.disabled = true;
    btn.textContent = "Loading...";
    setStatus("Loading posts...", "text-bg-warning");

    loadPostsForUser(user).then((posts) => {
      renderPosts(posts, postContainer); // ✅ pass array
      setStatus("Posts loaded", "text-bg-success");
      btn.textContent = "Refresh Posts";
      btn.disabled = false;
    });
  });
};

// ─── SEARCH USER ─────────────────────────────────────────────────
btnSearch.addEventListener("click", () => {
  // ✅ Validate empty input
  if (!searchInput.value.trim()) {
    setStatus("Please enter a name to search", "text-bg-warning");
    return;
  }

  setLoading(true);
  setStatus("Searching...", "text-bg-warning");

  loadUsers().then((users) => {
    // ✅ Case-insensitive partial match
    const user = users.find((u) =>
      u.name.toLowerCase().includes(searchInput.value.toLowerCase().trim()),
    );

    output.innerHTML = "";

    if (!user) {
      setStatus("User not found", "text-bg-danger");
    } else {
      renderUserCard(user);
      attachLoadPostButton(user); // ✅ reusable function
      setStatus(`Found: ${user.name}`, "text-bg-success");
    }

    setLoading(false);
  });
});

// ─── LOAD ALL USERS ───────────────────────────────────────────────
btnLoadUser.addEventListener("click", () => {
  setLoading(true);
  setStatus("Loading users...", "text-bg-warning");
  output.innerHTML = "";

  loadUsers().then((users) => {
    if (users.length === 0) return;

    users.forEach((user) => {
      renderUserCard(user);
      attachLoadPostButton(user); // ✅ reusable function
    });

    setStatus(`${users.length} users loaded`, "text-bg-success");
    setLoading(false);
  });
});

// ─── CLEAR ────────────────────────────────────────────────────────
btnClear.addEventListener("click", clearDashboard);

console.log({
  btnLoadUser,
  btnClear,
  btnSearch,
  status,
  output,
  searchInput,
  spinner, // likely null — missing from HTML
});
