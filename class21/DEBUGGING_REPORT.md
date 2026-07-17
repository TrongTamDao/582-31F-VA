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
