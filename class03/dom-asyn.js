const btn = document.getElementById("load-btn");
const output = document.getElementById("output");

function fakeLoad() {
  let promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data loaded successfully!");
    }, 1000);
  });
  return promise;
}
btn.addEventListener("click", () => {
  output.textContent = "Loading...";
  fakeLoad().then((result) => {
    output.textContent = result;
  });
});
