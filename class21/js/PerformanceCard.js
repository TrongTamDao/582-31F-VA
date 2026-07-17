export class PerformanceCard extends HTMLElement {
  // FIX: use a private field to avoid getter/setter recursion
  #performance = null;

  constructor() {
    // FIX: super() must come before any use of this
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // FIX: correct template id matches index.html
    const template = document.getElementById("performance-card-template");

    // FIX: clone template.content (not the template element); deep = true
    shadow.appendChild(template.content.cloneNode(true));
  }

  set performance(value) {
    // FIX: store in private field to avoid infinite recursion
    this.#performance = value;
    // FIX: call render() as a method
    this.render();
  }

  get performance() {
    // FIX: return private field
    return this.#performance;
  }

  render() {
    const p = this.#performance;
    if (!p) return;

    // FIX: query article from shadowRoot, not from document
    const article = this.shadowRoot.querySelector(".performance-card");

    // Reset classes then apply correct ones
    article.className = "performance-card";

    // FIX: featured check uses p.featured property (from FeaturedPerformance)
    if (p.featured) {
      article.classList.add("featured");
    }

    // FIX: sold-out when !hasTickets (no tickets remaining)
    if (!p.hasTickets) {
      article.classList.add("sold-out");
    }

    // FIX: displayLabel is a getter (no parentheses)
    this.shadowRoot.querySelector(".title").textContent = p.title;
    this.shadowRoot.querySelector(".artist").textContent =
      p.artist.displayLabel;

    // FIX: country and genre were swapped
    this.shadowRoot.querySelector(".country").textContent = p.artist.country;
    this.shadowRoot.querySelector(".genre").textContent = p.artist.genre;

    // FIX: stage and time were swapped
    this.shadowRoot.querySelector(".stage").textContent = `Stage: ${p.stage}`;
    this.shadowRoot.querySelector(".time").textContent = `Time: ${p.time}`;

    // FIX: formattedPrice and ticketLabel are getters — no ()
    this.shadowRoot.querySelector(".price").textContent = p.formattedPrice;
    this.shadowRoot.querySelector(".tickets").textContent = p.ticketLabel;
    this.shadowRoot.querySelector(".lineup-label").textContent = p.lineupLabel;
  }
}

// FIX: pass class reference (not PerformanceCard()); name must contain a hyphen
customElements.define("performance-card", PerformanceCard);
