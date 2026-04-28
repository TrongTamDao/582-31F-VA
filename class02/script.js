//1. asynchronous vs synchronous

//let's look at normal sequential code.

console.log("Start");
console.log("Middle");
console.log("End");

console.log("=========");
//in a sequential mannner, code runs in order
//each line computes and completes before the next one

//now, we can look at deferred execution

console.log("Start");

//we could use setTimeout(), to run the code
//after a certain amount of time

setTimeout(() => {
  console.log("Middle");
}, 1000);
console.log("End");

console.log("=========");

console.log("callback functions");

function sayHello(name) {
  console.log("hello " + name);
}

function doSomethingLater(callback) {
  console.log("Doing setup...");
  callback(); //The argument/parameter callback is a function, not an integer or any data type
}

// we have to pass a function as a argument to the doSomethingLater function

doSomethingLater(() => {
  sayHello("Jane");
});

//

doSomethingLater(() => {
  console.log("Nice to meet you");
});
//**
//
//functionName(()=>{

// })

//** */

//concept of Continuation

//a continuation is the next piece of work the program should do
//(it's often represented as a function to run later)

/**
 * DOM REVIEW
 *
 */
// const title = document.querySelector("#title");
const title = document.getElementById("title");

const description = document.querySelector(".description");

const output = document.getElementById("output");

console.log("=========");

console.log(title);
console.log(description);
console.log(description.textContent);

output.textContent = "Whatever you want";

const topics = ["Big Bang", "Quantum physic", "Dark matter"];

topicList = document.getElementById("topic-list");

for (let topic of topics) {
  //we create our element
  const li = document.createElement("li");
  li.textContent = topic;
  //add the list item to our 'ul'
  topicList.appendChild(li);
}

/**
 * Event handling
 */

const btn = document.getElementById("my-button");
const nameInput = document.getElementById("name-input");

//we can have function triggered by specific events
//we can do so by using addEventListener
btn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  output.textContent = "hello " + name;
});

//the example above is also a continuation /callback

/**input event */

const previewOutput = document.getElementById("preview-output");
nameInput.addEventListener("input", () => {
  console.log("typing...");
  previewOutput.textContent = `typing ${nameInput.value}`;
});
