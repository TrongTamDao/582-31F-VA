import { getTournamentData } from "./api.js";
import { getRegistrationData } from "./api.js";
import { renderTournament } from "./ui.js";
import { clearContent } from "./ui.js";

const btnTournament = document.getElementById("btnLoad");
const btnClear = document.getElementById("btnClear");
const output = document.getElementById("tournamentGrid");

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
});

btnClear.addEventListener("click", () => {
  clearContent(output);
});
