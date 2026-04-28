function greetUser(name) {
  console.log("hello, " + name + " I hope you are good");
}

const name = "Nora";
greetUser(name);

// 1. Write a RETURN function that adds name
// and lastName with a space and returns it to fullName
function getFullName(name, lastName) {
  return name + " " + lastName;
}

const fullName = getFullName("tam", "dao");
// 2. Write a function that greets the user calling their fullName
function greeting(fullName) {
  console.log("hello " + fullName);
  return "hello " + fullName;
}

//DOM
document.getElementById("title").innerText = greeting(fullName);
