/**
 * Exercise
 */

// 1. load in DOM elements

// nameinput
const nameInput = document.getElementById("name-input");
// greet button
const btnGreet = document.getElementById("greet-button");
// output
const output = document.getElementById("output");

// 2. add an event listener to the button
btnGreet.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (name) {
    // 1. take the input value and trim it

    output.textContent = "Waiting for 1000ms";

    // continuation function for it should be:

    // 2. (condition)
    // validate that the input is not an empty string
    // if it is --> update output text to :
    //                  Please enter something

    // 3. after 1000ms , update the output with:
    //                  Hello, INPUT_VALUE
    setTimeout(() => {
      output.textContent = "hello " + name;
    }, 1000);
    nameInput.value = "";
  } else {
    output.textContent = "Please enter a name";
  }
});
