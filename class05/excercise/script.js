// Ex 01
const loadUserbtn = document.getElementById("load-user-btn");

const status = document.getElementById("status");

const userList = document.getElementById("userList");

loadUserbtn.addEventListener("click", () => {
  const userFetch = fetch("https://jsonplaceholder.typicode.com/users");

  status.textContent = "Loading user...";

  userFetch
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      for (let i = 0; i < 5; i++) {
        userList.innerHTML += `<li>${result[i].name}</li>`;
      }
    });
});
