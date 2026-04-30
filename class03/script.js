// Promises

// JavaScript is often asynchronous

// console.log("Hello");
// console.log("bye");

// A promises let us say:
// this work is happing
// it will eventually succeed or finally
// based on that , it does somthing after
//     we have an object of type Promise
//     it represents a state (PromiseState) --> resolved/fullfilled
//     it has a PromiseResult --> the value of the promise when it is resolved

const promise = Promise.resolve("Hello from a resolved promise");
console.log(promise);

// const failPromise = Promise.reject("Error from a rejected promise");
// console.log(failPromise);

// a Promise has 3 states:
// 1. pending: still waiting
// 2. fullfiled: completed successfully
// 3. rejected: fail

//IMPORTANT: conceptual distinction
const value = Promise.resolve(42); //we are not giving 42 directly. We are making a promise object
console.log(value);

// Consuming Promises with .then() and .catch()
//.then runs when the promise is fulfilled
//it receives the resolved value

//.catch() runs when the promise is rejected
//it receives the error or rejection reason

//Basic resolved Promise
Promise.resolve("hello world").then((result) => {
  console.log(result);
});

//Basic rejected Promise
Promise.reject("Fail to load").catch((error) => {
  console.log(error);
});

//Both success and failure flow

const success = true;

//we

const myPromise = new Promise((resolve, reject) => {
  if (success) {
    resolve("Promise resolved successfully"); // an object pass as an agrument to then() function below
  } else {
    reject("Promise rejected");
  }
});

myPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

//IMPORTANT
// A Promise is not magic
// It is often wrapping asynchronous work such as timer, or HTTP request, etc..

// Delayed success or failure
const success2 = false;
const myPromise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (success2) {
      resolve("Promise resolved successfully after 2 seconds");
    } else {
      reject("Promise rejected after 2 seconds");
    }
  }, 2000);
});

myPromise2
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
