export const renderTeam = (team, container) => {
  const teamCard = document.createElement("team-card");

  teamCard.setAttribute("name", team.name);
  teamCard.setAttribute("group", team.group);
  teamCard.setAttribute("points", team.points);
  teamCard.setAttribute("played", team.played);
  teamCard.setAttribute("goal-difference", team.goalDifference);

  container.append(teamCard);
};
