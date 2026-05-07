// let's load all DOM

const loadUserbtn = document.getElementById("load-user-btn");
const status = document.getElementById("status");
const output = document.getElementById("output");

//addEventListener to button
loadUserbtn.addEventListener("click", () => {
  // first status update
  status.textContent = "Loading user...";
  output.innerHTML = "";

  //now let's fetch
  const userFetch = fetch("https://jsonplaceholder.typicode.com/users/7");

  userFetch
    .then((response) => {
      if (response.ok == false) {
        throw new Error("HTTP error: ${response.status}");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      output.innerHTML = `${data.name}`;
      status.textContent = "User loading Successfully";
    })
    .catch((error) => {
      status.textContent = "Failed to load user";
      console.log(error);
    });
});
