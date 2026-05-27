export function renderUsers(users, container) {
  container.innerHTML = "";
  users.slice(0, 5).forEach((user) => {
    const article = document.createElement("article");
    article.className = "col";
    article.innerHTML = `
    <div class="card h-100 shadow-sm">
        <div class="card-body">
            <h2><strong>${user.name}</strong></h2>
            <p><strong>Email:</strong>${user.email}</p>
            <p><strong>City:</strong>${user.address.city}</p>
        </div>
    </div>
    `;
    container.appendChild(article);
  });
}

export function renderPosts(posts, container) {
  container.innerHTML = "";

  posts.forEach((post) => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h2><strong>${post.title}</strong></h2>
            <p><strong>Content:</strong> ${post.body}</p>
            <p><strong>ID:</strong> ${post.id}</p>
          </div>
        </div>
      </div>
    `;
  });
}
