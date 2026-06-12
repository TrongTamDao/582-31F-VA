// export const getTournamentData = function (url) {
//   return fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP Error: ${response.status}`);
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// };

// export const getRegistrationData = function (url) {
//   return fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP Error: ${response.status}`);
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// };

// ── Shared fetch helper ───────────────────────────────
const fetchJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error ${response.status}: ${url}`);
  return response.json();
};

// ── API ───────────────────────────────────────────────
export const getTournamentData = (url) => fetchJSON(url);
export const getRegistrationData = (url) => fetchJSON(url);

// What changed and why:
// Extracted a shared fetchJSON helper — the two functions were byte-for-byte identical. Any future fix (auth headers, timeout, retry logic) now only needs to happen in one place.
// async/await — same reasoning as main.js: flatter, easier to read than .then() chains.
// Removed the .catch() that swallowed errors — this was a silent bug. When a fetch failed, your original code caught the error, logged it, and then returned undefined to the caller. That meant main.js would try to call .forEach() on undefined and crash with a confusing error instead of the real one. Letting the error propagate means the try/catch in main.js catches it and shows the user a proper message.
// Added url to the error message — when you have multiple fetches in flight, knowing which URL failed saves time debugging.
// Kept the named exports — even though getTournamentData and getRegistrationData are thin wrappers right now, keeping them as separate named exports is the right call. It means main.js doesn't need to know about fetchJSON, and you can later add endpoint-specific logic (different headers, response transforms) to each one independently without touching the caller.
