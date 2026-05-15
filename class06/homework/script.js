const output = document.getElementById("output");
const btn = document.getElementById("clickme");
const status = document.getElementById("status");
const btnClear = document.getElementById("clear");

btn.addEventListener("click", () => {
  status.innerHTML = `
    <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>`;
  setTimeout(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((post) => {
        console.log(post);
        output.innerHTML = `
            <div class="container mx-3">
                <div class="card h-100 shadow-sm bg-success-subtle" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${post.name}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${post.username}</h6>
                        <h6 class="card-text"><strong>Address</strong></h6>
                                <p><strong>City:</strong> ${post.address.city}</p>
                                <p><strong>Street:</strong> ${post.address.street}</p>
                                <p><strong>Suit:</strong> ${post.address.suite}<p>
                                <p><strong>Email:</strong>${post.email}</p>
                                <p><strong>Phone:</strong> ${post.phone}</p>
                                <p><strong>Company name:</strong> ${post.company.name}</p>
                                <p><strong>Website:</strong> ${post.website} </p>
                    </div>
                </div>
            </div>
        `;
      })
      .catch((error) => {
        status.textContent = `Faild to load post: ${error.message}`;
      });
    status.textContent = "Loaded successfully";
  }, 1000);
});

btnClear.addEventListener("click", () => {
  output.innerHTML = "";
  status.textContent = "Ready";
});
