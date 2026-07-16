const btn = document.getElementById("selectBtn");
const output = document.getElementById("output");

// 1. Listen for the custom event
document.addEventListener("movieSelected", (e) => {
  output.innerHTML = `
                🎬 Movie Selected! <br><br>
                <span class="highlight">Title:</span> ${e.detail.title} <br>
                <span class="highlight">Year:</span>  ${e.detail.year}  <br>
                <span class="highlight">Rating:</span> ★ ${e.detail.rating}
            `;
});

// 2. Dispatch the custom event on button click
btn.addEventListener("click", () => {
  const event = new CustomEvent("movieSelected", {
    detail: {
      title: "Inception",
      year: 2010,
      rating: 8.8,
    },
  });

  document.dispatchEvent(event);
});
