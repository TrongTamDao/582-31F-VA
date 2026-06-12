import { getTournamentData, getRegistrationData } from "./api.js";
import { renderSummary, renderTournament } from "./ui.js";
import { clearContent, setStatus, renderRegistration } from "./ui.js";
import { Tournament } from "./tournament.js";
import { TournamentSummary } from "./summary.js";

// ── DOM refs ──────────────────────────────────────────

const btnTournament = document.getElementById("btnLoad");
const btnClear = document.getElementById("btnClear");
const output = document.getElementById("tournamentGrid");
const status = document.getElementById("status");
const registered = document.getElementById("registrationPanel");
const registeredSummary = document.getElementById("summary");

// ── State ─────────────────────────────────────────────
let tournamentData = [];

// ── Load tournaments ──────────────────────────────────

btnTournament.addEventListener("click", () => {
  output.innerHTML = "";
  btnTournament.disabled = true;

  getTournamentData("tournaments.json")
    .then((tournaments) => {
      tournamentData = tournaments;
      // console.log(tournamentData);
      tournaments.forEach((tournament) => {
        renderTournament(output, tournament);
      });
      setStatus("Loading completed", "success");
    })
    .catch((error) => {
      setStatus(`Fail to load tournament: ${error.stack}`, "danger");
    })
    .finally(() => {
      btnTournament.disabled = false;
    });
});

// console.log(tournamentData);

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-view")) return;

  const btn = e.target;
  const tournamentId = Number(btn.dataset.id);
  setStatus("Loading registrations...", "secondary");
  btn.disabled = true;

  getRegistrationData("registrations.json")
    .then((registrations) => {
      const filtered = registrations.filter(
        (registration) => registration.tournamentId === tournamentId,
      );
      registered.innerHTML = "";
      if (filtered.length === 0) {
        setStatus("No registrations found for this tournament.", "warning");
        return;
      }
      const confirmed = filtered.filter((r) => r.status === "confirmed");

      // console.log(confirmed);
      // console.log(tournamentData);

      const selectedGame = tournamentData.filter((t) => t.id === tournamentId);
      console.log(selectedGame[0]);

      const selectedTournament = Tournament.fromObject(selectedGame[0]);
      console.log(selectedTournament.spotsLeft);

      const expectedRevenue = selectedGame[0].entryFee * confirmed.length;

      const summaryOfTournament = new TournamentSummary(
        selectedGame[0].name,
        filtered.length,
        confirmed.length,
        expectedRevenue,
        selectedTournament.spotsLeft,
      );
      console.log(summaryOfTournament);

      renderSummary(registeredSummary, summaryOfTournament);

      const summaryRegistration = filtered.forEach((registration) => {
        renderRegistration(registered, registration);
        setStatus("Registrations loaded", "success");
      });
    })
    .catch((error) => {
      setStatus(error.stack, "danger");
    })
    .finally(() => {
      btn.disabled = false;
    });
});

btnClear.addEventListener("click", () => {
  clearContent(output, status, registered, registeredSummary);
});
