class HelloBox extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div>
        <h2>Hello!</h2>
        <p>Welcome to custom elements.</p>
      </div>
    `;
  }
}

customElements.define("hello-box", HelloBox);
// 1. create a custom element called:
//              <movie-card></movie-card>

// this element should accept these attributes:

//   1. title 2. year 3. rating

// render it on your html file.

// class MovieCard extends HTMLElement {
//   connectedCallback() {
//     const title = this.getAttribute("title");
//     const year = this.getAttribute("year");
//     const rating = this.getAttribute("rating");

//     this.innerHTML = `
//     <div>
//       <h2>${title}</h2>
//       <p><strong>${year}</strong></p>
//       <p><strong>${rating}</strong></p>
//     </div>
//   `;
//   }
// }
// customElements.define("movie-card", MovieCard);

// 2. refactor a basic custom element

// refactor it so that connectedCallback only calls render()
// All HTML generation happens inside render()

class MovieCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title");
    const year = this.getAttribute("year");
    const rating = this.getAttribute("rating");

    this.innerHTML = `
    <div>
      <h2>${title}</h2>
      <p><strong>${year}</strong></p>
      <p><strong>${rating}</strong></p>
    </div>
  `;
  }
}
customElements.define("movie-card", MovieCard);

// 3. create another GameCard custom element with the following:

//      1. connectedCallback()
//      2. getTitle()
//      3. getYear()
//      4. getRating()
//      4.b formats Rating  -- ratingFormatter() X/5
//      5. renderHeading()
//      6. renderBody()
//      5. render()

class GameCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  getTitle() {
    return this.getAttribute("title");
  }

  getYear() {
    return this.getAttribute("year");
  }

  getRating() {
    return this.getAttribute("rating");
  }

  formatRating(rating) {
    return `${rating} / 5`;
  }

  renderHeading() {
    return `<h2>Game Name: ${this.getTitle()}</h2>`;
  }

  renderBody() {
    const year = this.getYear();
    const rating = this.getRating();
    return `
      <p>${year}</p>
      <p>Rating: ${this.formatRating(rating)}</p>
    `;
  }

  render() {
    this.innerHTML = `
    <div>
      ${this.renderHeading()}
      ${this.renderBody()}
    </div>
    `;
  }
}
customElements.define("game-card", GameCard);
