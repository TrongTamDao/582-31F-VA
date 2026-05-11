const loadbtn = document.getElementById("loadbtn");
const status = document.getElementById("status");
const output = document.getElementById("output");

const fetchData = fetch("https://jsonplaceholder.typicode.com/posts");

fetchData
  .then((response) => return response.json())
  .catch((error) => console.log(error));

console.log(response[0].id);
