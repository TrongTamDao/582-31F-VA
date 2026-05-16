// DOM loading
const btnLoad = document.getElementById("load-post");
const btnClear = document.getElementById("clear");
const status = document.getElementById("status");
const output = document.getElementById("output");
const className = document.querySelector(".alert");

const setStatus = function (message, type) {
  status.textContent = message;
  className.classList.add(".type");
};

const clearDashboard = function () {
  output.innerHTML = "";
  status.textContent = "Ready";
};

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((post) => console.log(post));

const loadUsers = function () {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => console.log(`Fail to load post: ${error.message}`));
};

loadUsers().then((post) => console.log(post));

const renderUderCard = function (user) {
  output.innerHTML = `
            <div class="col mx-3">
                <div class="card h-100 shadow-sm bg-success-subtle" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${user.name}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${user.username}</h6>
                        <h6 class="card-text"><strong>Address</strong></h6>
                                <p><strong>City:</strong> ${user.address.city}</p>
                                <p><strong>Street:</strong> ${user.address.street}</p>
                                <p><strong>Suit:</strong> ${user.address.suite}<p>
                                <p><strong>Email:</strong>${user.email}</p>
                                <p><strong>Phone:</strong> ${user.phone}</p>
                                <p><strong>Company name:</strong> ${user.company.name}</p>
                                <p><strong>Website:</strong> ${user.website} </p>
                    </div>
                </div>
            </div>
        `;
};

const loadPostsForUser = function (user, postsContainer) {
  fetch("https://jsonplaceholder.typicode.com/posts/${user}");
};
