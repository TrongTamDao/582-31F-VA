class HelloCard extends HTMLElement {
  static get observedAttributes() {
    return ["name"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    // ❌ Problem: creates a new shadow root every time
    // const shadow = this.attachShadow({ mode: "open" });
    const shadow = this.shadowRoot || this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <h2>Hello ${this.getAttribute("name")}</h2>
    `;
  }
}

customElements.define("hello-card", HelloCard);

const card = document.getElementById("card");

// Change an attribute
card.setAttribute("name", "Eva");
