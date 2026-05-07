// Fetch

// A javascript native tool
// it's for requesting external data over HTTP

// Last week we look at Promises
// Today, we see how fetch returns a Promise

// fetch() is how browser JS asks a server for information

function getStudentData() {
  return new Promise((resolve) => {
    // resolve(55); a value
    // resolve("hello"); a string
    // a JS object
    resolve({ name: "Alice", Program: "Web dev" });
  });
}

getStudentData().then((result) => {
  console.log(result);
});

// now we're moving to fetch to make actual server request.

// The general flow is:
// 1. our browser sends a request to a server
// 2. The server sends back a response
// 3 That response may contain data, often in JSON

//This is the first thing to do, we dont get any data back

fetch("https://jsonplaceholder.typicode.com/users/1");

//we re logging a Promise, not the data

const fetchRequest = fetch("https://jsonplaceholder.typicode.com/users/1");

console.log(fetchRequest);

// Promise now -> result later

// .then gets  Response object, not the final parsed JSON

// fetch() gives us the response first
// then, we will need to extract and parse the data from that response.

//we need to understand that:
// when fetch() successed, the Promise resolves with a Response object

// Promise Oject -> Response object

// some important properties/attributes of a Response object are:
// response.status
// response.ok

// and important method:
// response.parse()
fetchRequest
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    console.log("========================");
    console.log("Parsed JSON: ");
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// In general:
// 200 range = success
// 400 range = not found, not athorized, etc
// 500 range = server error, i

// 404 example
const badFetchRequest = fetch("https://jsonplaceholder.typicode.com/users/100");
