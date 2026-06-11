import { getTournamentData, getRegistrationData } from "./api.js";
import { renderTournament } from "./ui.js";
import { clearContent, setStatus, renderRegistration } from "./ui.js";

const btnTournament = document.getElementById("btnLoad");
const btnClear = document.getElementById("btnClear");
const output = document.getElementById("tournamentGrid");
const status = document.getElementById("status");
const registered = document.getElementById("registrationPanel");

btnTournament.addEventListener("click", () => {
  output.innerHTML = "";
  btnTournament.disabled = true;

  getTournamentData("tournaments.json")
    .then((tournaments) => {
      tournaments.forEach((tournament) => {
        renderTournament(output, tournament);
      });
      setStatus("Loading completed", "success");
    })
    .catch((error) => {
      setStatus(`Fail to load tournament: ${error.message}`, "danger");
    })
    .finally(() => {
      btnTournament.disabled = false;
    });
});

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

      filtered.forEach((registration) => {
        renderRegistration(registered, registration);
        setStatus("Registrations loaded", "success");
      });
    })
    .catch((error) => {
      setStatus(error.message, "danger");
    })
    .finally(() => {
      btn.disabled = false;
    });
});

btnClear.addEventListener("click", () => {
  clearContent(output, status, registered);
});
