export const setStatus = function (message, type = "secondary") {
  const status = document.getElementById("status");
  status.className = `alert alert-${type} py-2`;
  status.textContent = message;
};

export const renderTournament = function (output, tournament) {
  output.innerHTML += `
    <div class="col" id="card-${tournament.id}">
      <div class="card h-100 shadow-sm bg-success-subtle">
        <div class="card-body">

          <h5 class="card-title">
            ${tournament.name}
          </h5>

          <p>
            <strong>Game:</strong>
            ${tournament.game}
          </p>

          <p>
            <strong>Entry Fee:</strong>
            $${tournament.entryFee}
          </p>

          <p>
            <strong>Max Players:</strong>
            ${tournament.maxPlayers}
          </p>

          <p>
            <strong>Registered Players:</strong>
            ${tournament.registeredPlayers}
          </p>

          <p>
            <strong>Status:</strong>
            ${tournament.status}
          </p>

          <button
            class="btn btn-primary btn-view"
            data-id="${tournament.id}"
          >
            View Registrations
          </button>

        </div>
      </div>
    </div>
  `;
};

export const clearContent = function (output) {
  output.innerHTML = `<p class="text-muted col">No tournaments loaded yet.</p>`;
};

export const renderRegistration = function (registrations, container) {
  container.innerHTML = registrations
    .map(
      (registration) => `
    <div class="border rounded p-2 mt-2 bg-light">
        <p class="mb-0">${registration.id}</p>
        <p class="mb-0">${registration.tournamentId}</p>
        <p class="mb-0">${registration.gamerTag}</p>
        <p class="mb-0">${registration.ticketType}</p>
        <p class="mb-0">${registration.status}</p> 
    </div>
  `,
    )
    .join("");
};
