import { TeamCard } from "./team-card.js";
import { fetchTeams } from "./api.js";
import { renderTeam } from "./ui.js";

const loadBtn = document.getElementById("load-btn");
const clearBtn = document.getElementById("clear-btn");

const teamContainers = document.getElementById("teams-container");

const teamData = await fetchTeams("team.json");

loadBtn.addEventListener("click", () => {
  teamData.forEach((team) => renderTeam(team, teamContainers));
});
