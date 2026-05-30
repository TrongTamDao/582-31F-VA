const input = document.getElementById("comment-number-input");
const status = document.getElementById("status");
const loadCommentBtn = document.getElementById("load-comment-btn");
const output = document.getElementById("output");

// try {
//   JSON.parse("{ name: Alice }");
// } catch (error) {
//   console.log("JSON parsing failed");
//   console.log(error.message);
// }

function validateCommentId(value) {
  const numberId = Number(value);
  if (!Number.isInteger(numberId) || numberId <= 0) {
    throw new Error("Comment ID cannot be 0 or negative");
  }
  return numberId;
}

loadCommentBtn.addEventListener("click", () => {
  loadCommentBtn.disabled = true;
  try {
    const commentId = validateCommentId(input.value);
    fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((comment) => {
        output.innerHTML = `
        <h2>${comment.id}</h2>
        <h2>${comment.name}</h2>
        <p>${comment.body}</p>
        `;
        status.textContent = "Post loaded successfully";
      })
      .catch((error) => {
        status.textContent = `Fail to load comment: ${error.message}`;
      })
      .finally(() => {
        loadCommentBtn.disabled = false;
      });
  } catch (error) {
    status.textContent = error.message;
    loadCommentBtn.disabled = false;
  }
});
