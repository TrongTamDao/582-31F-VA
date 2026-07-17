## Bug 1 — `api.js`: fetch calls not awaited; `Promise.all` called incorrectly; wrong file path; wrong response validation; `.json()` not called correctly; wrong return keys

**File:** `js/api.js`

**Original defective code:**

```javascript
const artistResponse = fetch("./artist.json"); // not awaited
const performanceResponse = fetch("./performances.json");

const responses = Promise.all(artistResponse, performanceResponse); // not an array; not awaited

if (artistResponse.ok || performanceResponse.ok) {
  // wrong: should be !ok
  throw new Error("Festival data could not be loaded.");
}

const artists = artistResponse.json; // not called as function
const performances = performanceResponse.json(); // not awaited

return {
  artist: artists, // wrong key name
  performance: performances,
};
```

**Correction:**

```javascript
const [artistResponse, performanceResponse] = await Promise.all([
  fetch("./artists.json"), // correct filename
  fetch("./performances.json"),
]);

if (!artistResponse.ok)
  throw new Error(`Failed to load artists: ${artistResponse.status}`);
if (!performanceResponse.ok)
  throw new Error(`Failed to load performances: ${performanceResponse.status}`);

const artists = await artistResponse.json();
const performances = await performanceResponse.json();

return { artists, performances };
```

## Bug 2 — `Artist.js`: constructor properties assigned in wrong order; `displayLabel` used wrong property names

**File:** `js/Artist.js`

**Original defective code:**

```javascript
constructor(id, name, country, genre) {
  this.id         = name;     // wrong
  this.artistName = id;       // wrong property name
  this.country    = genre;    // wrong
  this.genre      = country;  // wrong
}

get displayLabel() {
  return `${this.artistName} — ` + `${this.genre}`;
  // artistName holds id value; genre holds country value
}
```

**Correction:**

```javascript
constructor(id, name, country, genre) {
  this.id      = id;
  this.name    = name;
  this.country = country;
  this.genre   = genre;
}

get displayLabel() {
  return `${this.name} — ${this.country}`;
}
```

## Bug 3 — `Performance.js`: six separate property, logic, and calculation bugs

**File:** `js/Performance.js`

**Original defective code:**

```javascript
this.name             = title;           // wrong property name — should be this.title
this.stage            = time;            // stage and time swapped
this.time             = stage;
this.ticketPrice      = String(ticketPrice);    // must stay numeric
this.ticketsRemaining = String(ticketsRemaining);

get formattedPrice()  { return `$${this.ticketPrice.toFixed}`; }  // .toFixed not called
get hasTickets()      { return this.ticketsRemaining < 0; }        // wrong comparison
get lineupLabel()     { return "Featured performance"; }            // wrong for base class

static totalAvailableTickets(performances) {
  return performances.reduce((total, p) => total + p.ticketsRemaining, ""); // string seed
}

static averagePrice(performances) {
  return (total / performances).toFixed(2); // divides by array not length
}
```

**Correction:**

```javascript
this.title            = title;
this.stage            = stage;
this.time             = time;
this.ticketPrice      = Number(ticketPrice);
this.ticketsRemaining = Number(ticketsRemaining);

get formattedPrice()  { return `$${this.ticketPrice.toFixed(2)}`; }
get hasTickets()      { return this.ticketsRemaining > 0; }
get lineupLabel()     { return "Regular lineup"; }

static totalAvailableTickets(p) { return p.reduce((t, x) => t + x.ticketsRemaining, 0); }
static averagePrice(p)          { return `$${(total / p.length).toFixed(2)}`; }
```

## Bug 4 — `FeaturedPerformance.js`: did not extend `Performance`; `super()` arguments in wrong order; `featured` set to `false`; `lineupLabel` returned wrong string

**File:** `js/FeaturedPerformance.js`

**Original defective code:**

```javascript
import Performance from "./Performance.js";        // default import — Performance is named export

export class FeaturedPerformance {                 // missing "extends Performance"
  constructor(...) {
    super(title, id, stage, artist, ticketPrice, ticketsRemaining, time);  // wrong order
    this.featured = false;                         // should be true
  }

  get lineupLabel() { return "Regular lineup"; }  // wrong — should be "Featured performance"
}
```

**Correction:**

```javascript
import { Performance } from "./Performance.js";

export class FeaturedPerformance extends Performance {
  constructor(
    id,
    title,
    artist,
    stage,
    time,
    ticketPrice,
    ticketsRemaining,
    featured,
  ) {
    super(id, title, artist, stage, time, ticketPrice, ticketsRemaining);
    this.featured = true;
  }

  get lineupLabel() {
    return "Featured performance";
  }
}
```

## Bug 5 — `PerformanceCard.js`: did not extend `HTMLElement`; `super()` after `this`; wrong template id; shallow clone; getter/setter recursion; wrong DOM queries; swapped classes and properties; getters called as methods; invalid element name

**File:** `js/PerformanceCard.js`

**Original defective code:**

```javascript
export class PerformanceCard {                          // missing extends HTMLElement
  constructor() {
    const shadow = this.attachShadow({ mode: "open" }); // this before super()
    super();
    const template = document.getElementById("performance-template"); // wrong id
    shadow.appendChild(template.cloneNode());           // shallow clone, clones template not content
  }

  set performance(value) {
    this.performance = value;  // infinite recursion — calls itself
    this.render;               // not invoked
  }

  get performance() {
    return this.performance;   // infinite recursion
  }

  render() {
    const article = document.querySelector(".performance-card"); // queries document not shadowRoot
    if (this.performance.featured)  article.classList.add("sold-out");  // swapped
    if (!this.performance.hasTickets) article.classList.add("featured"); // swapped
    // ...
    .artist.displayLabel()    // displayLabel is a getter not a method
    .country → genre          // swapped
    .genre   → country        // swapped
    .stage   → time           // swapped
    .time    → stage          // swapped
    .formattedPrice()         // getter called as method
    .ticketLabel()            // getter called as method
  }
}

customElements.define("performance", PerformanceCard()); // invalid name, class called as function
```

## Bug 6 — `app.js`: 14 bugs across imports, DOM selectors, async flow, filtering, sorting, and event registration

**File:** `js/app.js`

**Original defective code (selected examples):**

```javascript
import { Artist } from "./Artist.js";                // Artist is now a named export ✓
import { Performances } from "./Performance.js";     // wrong class name
import "./PerformanceCards.js";                      // wrong filename
import { renderLoading, renderErrors, renderPerformance } from "./ui.js"; // renderPerformance wrong name

const loadButton    = document.getElementById("load-festival");  // wrong id
const searchInput   = document.getElementById("search");         // wrong id
const ticketsFilter = document.getElementById("ticket-filter");  // wrong id
const featuredFilter= document.getElementById("featured-only");  // wrong id
const sortSelect    = document.getElementById("sort-filter");    // wrong id
const resetButton   = document.getElementById("reset");          // wrong id

renderLoading;                          // not called
const data = getFestivalData();         // not awaited
artists.filter(a => a.id === item.artistId);  // returns array not single object
performances = performances.filter(…); // overwrites source — destroys state
ticketsFilter.value; featuredFilter.value;    // checkboxes use .checked
matchesSearch || matchesStage || …;     // OR logic — should be AND
performance.time === stage;             // should be performance.stage
instanceof Performance;                 // should be FeaturedPerformance
(a,b) => a.ticketPrice > b.ticketPrice; // boolean not number for sort
(a,b) => a.artist.name - b.artist.name; // subtraction on strings gives NaN
applyFilters;                           // not called in resetFilters
loadButton.addEventListener("click", loadLineup()); // runs immediately
stageFilter.addEventListener("input", applyFilters()); // runs immediately
loadButton.disabled = true;             // at end — should be false
```
