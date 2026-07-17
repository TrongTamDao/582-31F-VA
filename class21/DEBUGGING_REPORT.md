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
