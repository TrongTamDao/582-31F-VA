import { getTournamentData, getRegistrationData } from "./api.js";
import {
  renderSummary,
  renderTournament,
  renderRegistration,
  clearContent,
  setStatus,
} from "./ui.js";
import { Tournament } from "./tournament.js";
import { TournamentSummary } from "./summary.js";

// ── DOM refs ──────────────────────────────────────────
const btnLoad = document.getElementById("btnLoad");
const btnClear = document.getElementById("btnClear");
const output = document.getElementById("tournamentGrid");
const status = document.getElementById("status");
const registered = document.getElementById("registrationPanel");
const registeredSummary = document.getElementById("summary");
const btnSearch = document.getElementById("search");
const searchedTournament = document.getElementById("tournament-search");

// ── State ─────────────────────────────────────────────
let tournamentData = [];
let registrationCache = null;

// ── Load tournaments ──────────────────────────────────
btnLoad.addEventListener("click", async () => {
  output.innerHTML = "";
  btnLoad.disabled = true;

  try {
    tournamentData = await getTournamentData("tournaments.json");
    tournamentData.forEach((tournament) =>
      renderTournament(output, tournament),
    );
    setStatus("Loading completed", "success");
  } catch (error) {
    setStatus(`Failed to load tournaments: ${error.message}`, "danger");
  } finally {
    btnLoad.disabled = false;
  }
});
// ---Search Tournament---------------------------------

btnSearch.addEventListener("click", () => {
  const query = searchedTournament.value.trim().toLowerCase();
  if (!query) {
    setStatus("Search is empty", "danger");
    return;
  }
  output.innerHTML = "";
  const foundTournament = tournamentData.filter(
    (t) =>
      t.game.trim().toLowerCase().includes(query) ||
      t.name.trim().toLowerCase().includes(query),
  );

  if (foundTournament.length === 0) {
    setStatus("Not found", "danger");
    return;
  }
  foundTournament.forEach((s) => {
    renderTournament(output, s);
  });
});

// ── View registrations ────────────────────────────────
document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("btn-view")) return;

  const btn = e.target;
  const tournamentId = Number(btn.dataset.id);

  setStatus("Loading registrations...", "secondary");
  btn.disabled = true;

  try {
    if (!registrationCache) {
      const registrationCache = await getRegistrationData("registrations.json");
    }
    const filtered = registrations.filter(
      (r) => r.tournamentId === tournamentId,
    );

    registered.innerHTML = "";

    if (filtered.length === 0) {
      setStatus("No registrations found for this tournament.", "warning");
      return;
    }

    const confirmed = filtered.filter((r) => r.status === "confirmed");
    const gameData = tournamentData.find((t) => t.id === tournamentId);
    const tournament = Tournament.fromObject(gameData);
    const summary = new TournamentSummary(
      gameData.name,
      filtered.length,
      confirmed.length,
      gameData.entryFee * confirmed.length,
      tournament.spotsLeft,
    );

    renderSummary(registeredSummary, summary);
    filtered.forEach((registration) =>
      renderRegistration(registered, registration),
    );
    setStatus("Registrations loaded", "success");
  } catch (error) {
    setStatus(error.message, "danger");
  } finally {
    btn.disabled = false;
  }
});

// ── Clear ─────────────────────────────────────────────
btnClear.addEventListener("click", () => {
  registrationCache = null;
  clearContent(
    output,
    status,
    registered,
    registeredSummary,
    searchedTournament,
  );
});

// Here's what changed and why:
// Merged the duplicate import — you had two separate import lines from "./ui.js". These combine cleanly into one.

// async/await instead of .then()/.catch() — both event handlers now use async/await. The logic reads top-to-bottom without nesting, and error handling with try/catch/finally is equivalent but much easier to follow.

// find() instead of filter()[0] — tournamentData.find((t) => t.id === tournamentId) is the right tool when you want a single item. filter() returns an array just to grab index 0, which is misleading.

// Removed all console.log calls — the commented-out ones too. These are noise in production code; add them back locally when debugging.

// error.message instead of error.stack — stack traces belong in the browser console for developers, not in UI status messages for users. .message gives the readable summary.

// setStatus moved outside forEach — in your original, setStatus("Registrations loaded") was inside the forEach callback, so it fired once per registration instead of once at the end. It now sits after the loop.

// Intermediate variables cleaned up — selectedGame, selectedTournament, expectedRevenue, summaryOfTournament, and the unused summaryRegistration variable (the return value of forEach, which is always undefined) are gone. The code builds what it needs without storing every step.

// Renamed btnTournament to btnLoad — it matches the actual element ID btnLoad and is less ambiguous.
