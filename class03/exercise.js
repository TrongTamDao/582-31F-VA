// create a function that checks password
// takes password as a parameter
// it returns a Promise
//It compares the entered password with your password
// based on that has reject or resolve
// call the function with 3 different passwords
// all should have a .then() and .catch()

const password = "12345678";

function checkPassword(inputPassword) {
  return new Promise((resolve, reject) => {
    if (inputPassword === password) {
      setTimeout(() => {
        resolve("Password is correct");
      }, 2000);
    } else {
      reject("Password is incorrect");
    }
  });
}

checkPassword("12345678")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// function checkPassword(inputPassword) {
//   return new Promise((resolve, reject) => {
//     if (inputPassword === password) {
//       setTimeout(() => {
//         resolve("Password is correct");
//       }, 2000);
//     } else {
//       reject("Password is incorrect");
//     }
//   });
// }

// checkPassword("12345678")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// bonus: wrap the resolve in a setTimeout of 2 seconds.
