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
            data-id="${tournament.id}" id="btn-${tournament.id}"
          >
            View Registrations
          </button>

        </div>
      </div>
    </div>
  `;
};

export const clearContent = function (output, status, registered) {
  output.innerHTML = `<p class="text-muted col">No tournaments loaded yet.</p>`;
  status.innerHTML = `<p id="status" class="text-muted fst-italic">
            Click "Load Tournaments" to see available tournaments.
          </p>`;
  status.className = "";
  registered.innerHTML = `            
                        <p class="text-muted">
                        Select a tournament above to view registration details.
                        </p>`;
};

export const renderRegistration = function (registered, registration) {
  registered.innerHTML += `
    <div class="col">
      <div class="card h-100 shadow-sm">
        <div class="card-body">

          <h5 class="card-title">
            ${registration.playerName}
          </h5>

          <p>
            <strong>Ticket:</strong>
            ${registration.ticketType}
          </p>

          <p>
            <strong>ID:</strong>
            ${registration.id}
          </p>

          <p>
            <strong>Gamer Tag:</strong>
            ${registration.gamerTag}
          </p>

          <p>
            <strong>Status:</strong>
            ${registration.status}
          </p>

        </div>
      </div>
    </div>
  `;
};
