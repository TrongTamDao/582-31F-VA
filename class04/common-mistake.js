// common mistake 1:
// Expecting

// common mistake 2:
//Forget to return inside a function

// common mistake 3:
// No catch for failure --> breaks the code eventually

// common mistake 4:

//difference between setTimeout and a Promise

// setTimeout(): executes code after the indicated time (schedule work later)
// Promise: It wraps future completion in a structure way?

// common mistake 5:
let data; //1
loadProfile() //2
  .then((result) => {
    data = result; //4
  });
console.log(data); //3
