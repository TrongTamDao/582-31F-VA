// // Promises and javascript object as return

let student = { id: 1, name: "Alice", role: "student" };
output = document.getElementById("output");
console.log(student);

let auth = true;
function loadUserData() {
  let promise = new Promise((resolve, reject) => {
    if (auth == true) {
      resolve(student);
    } else {
      reject("Authentication Failed");
    }
  });
  return promise;
}

loadUserData()
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error);
  });

//API --> Application Programming Interface
//API: set of rules and protocols that allow different software applications to communicate with another

//An important aspect of why we use Promises:
// The term --> concurrency
// Modern computers can run multiple codes at the same time

//Promises wrap these eventual outcomes for us, so that we dont have to wait until the outcome is present.

Promise.resolve(5)
  .then((result) => {
    console.log(`Step 1: ${result}`);
    return result * 2; // process and send ti to  the next .then
  })
  .then((result) => {
    console.log(`Step 2 : ${result}`); //final step
    return result;
  })
  .then((result) => {
    let newResult = result * 100;
    console.log(newResult);
  });

loadUserData()
  .then((user) => {
    //we extract the name
    console.log(`Username: ${user.name}`);
    return user.name;
  })
  .then((name) => {
    //we return it to upper case
    return name.toUpperCase();
  })
  .then((name) => {
    //we print
    output.textContent = ` Hello, ${name}!`;
  })
  .catch((error) => {
    //catch to make sure error is handled
    output.textContent = error;
  });
