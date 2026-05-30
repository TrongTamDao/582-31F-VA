const loadPostbtn = document.getElementById("load-post-btn");
const loadIdBtn = document.getElementById("load-id-input");
const clearBtn = document.getElementById("clear-post");

const input = document.getElementById("post-id-input");
const status = document.getElementById("status");
const output = document.getElementById("output");

function validatePostId(id) {
  const postId = Number(id);
  if (!Number.isInteger(postId) || postId <= 0) {
    throw new Error("Post ID must be a positive number");
  }
  return postId;
}

clearBtn.addEventListener("click", () => {
  status.textContent = "Click the button to load a post.";
  output.innerHTML = "";
});

loadPostbtn.addEventListener("click", () => {
  status.textContent = "Loading post...";
  output.innerHTML = "";

  try {
    const postId = validatePostId(input.value);
    console.log(input.value);
    fetch(`https://jsonplaceholder.typicode.com/posts/${input.value}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((post) => {
        output.innerHTML = `
    <h2>${post.title}</h2>
    <h2>${post.body}</h2>
    `;
        status.textContent = "Post loaded successfully";
      })
      .catch((error) => {
        status.textContent = `Failed to load post: ${error.message}`;
      });
  } catch (error) {
    status.textContent = error.message;
  } finally {
    console.log("Requeset finished");
  }
});
