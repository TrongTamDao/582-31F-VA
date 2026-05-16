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

const loadUser = function () {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => console.log(`Fail to load post: ${error.message}`));
};
