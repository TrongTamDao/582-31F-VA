import { TeamCard } from "./team-card.js";
import { fetchTeams } from "./api.js";
import { renderTeam } from "./ui.js";

const loadBtn = document.getElementById("load-btn");
const clearBtn = document.getElementById("clear-btn");

const teamContainers = document.getElementById("teams-container");

let teamData = [];
try {
  teamData = await fetchTeams("team.json");
} catch (error) {
  console.log(error);
}

loadBtn.addEventListener("click", () => {
  teamContainers.innerHTML = "";
  teamData.forEach((team) => renderTeam(team, teamContainers));
});
