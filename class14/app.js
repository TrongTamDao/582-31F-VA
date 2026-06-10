import { getTournamentData } from "./api.js";
import { getRegistrationData } from "./api.js";
import { renderTournament } from "./ui.js";
import { clearContent } from "./ui.js";
import { setStatus } from "./ui.js";

const btnTournament = document.getElementById("btnLoad");
const btnClear = document.getElementById("btnClear");
const output = document.getElementById("tournamentGrid");
const status = document.getElementById("status");

btnTournament.addEventListener("click", () => {
  output.innerHTML = "";

  getTournamentData("tournaments.json")
    .then((tournaments) => {
      console.log(tournaments);
      tournaments.forEach((tournament) => {
        console.log(tournament);
        renderTournament(output, tournament);
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
  setStatus("Loading completed", "success");
});

btnClear.addEventListener("click", () => {
  clearContent(output, status);
});
