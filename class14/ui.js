// export const setStatus = function (message, type = "secondary") {
//   const status = document.getElementById("status");
//   status.className = `alert alert-${type} py-2`;
//   status.textContent = message;
// };

// export const renderTournament = function (output, tournament) {
//   output.innerHTML += `
//     <div class="col" id="card-${tournament.id}">
//       <div class="card h-100 shadow-sm bg-success-subtle">
//         <div class="card-body">

//           <h5 class="card-title">
//             ${tournament.name}
//           </h5>

//           <p>
//             <strong>Game:</strong>
//             ${tournament.game}
//           </p>

//           <p>
//             <strong>Entry Fee:</strong>
//             $${tournament.entryFee}
//           </p>

//           <p>
//             <strong>Max Players:</strong>
//             ${tournament.maxPlayers}
//           </p>

//           <p>
//             <strong>Registered Players:</strong>
//             ${tournament.registeredPlayers}
//           </p>

//           <p>
//             <strong>Status:</strong>
//             ${tournament.status}
//           </p>

//           <button
//             class="btn btn-primary btn-view"
//             data-id="${tournament.id}" id="btn-${tournament.id}"
//           >
//             View Registrations
//           </button>

//         </div>
//       </div>
//     </div>
//   `;
// };

// export const clearContent = function (output, status, registered, summary) {
//   output.innerHTML = `<p class="text-muted col">No tournaments loaded yet.</p>`;
//   status.innerHTML = `<p id="status" class="text-muted fst-italic">
//             Click "Load Tournaments" to see available tournaments.
//           </p>`;
//   status.className = "";
//   registered.innerHTML = `
//                         <p class="text-muted">
//                         Select a tournament above to view registration details.
//                         </p>`;
//   summary.innerHTML = ` <p class="text-muted">
//                         No summary on registrations yet
//                         </p>`;
// };

// export const renderRegistration = function (registered, registration) {
//   registered.innerHTML += `
//     <div class="col">
//       <div class="card h-100 shadow-sm">
//         <div class="card-body">

//           <h5 class="card-title">
//             ${registration.playerName}
//           </h5>

//           <p>
//             <strong>Ticket:</strong>
//             ${registration.ticketType}
//           </p>

//           <p>
//             <strong>ID:</strong>
//             ${registration.id}
//           </p>

//           <p>
//             <strong>Gamer Tag:</strong>
//             ${registration.gamerTag}
//           </p>

//           <p>
//             <strong>Status:</strong>
//             ${registration.status}
//           </p>

//         </div>
//       </div>
//     </div>
//   `;
// };

// export function renderSummary(container, summary) {
//   container.innerHTML = `
//     <div class="card shadow-sm">
//       <div class="card-header">
//         <h5 class="mb-0">${summary.name}</h5>
//       </div>

//       <div class="card-body">
//         <p><strong>Total Registrations:</strong> ${summary.totalRegistrationNumber}</p>
//         <p><strong>Confirmed Players:</strong> ${summary.totalConfirmedNumber}</p>
//         <p><strong>Expected Revenue:</strong> $${summary.expectedRevenue}</p>
//         <p><strong>Spots Left:</strong> ${summary.spotsLeft}</p>
//       </div>
//     </div>
//   `;
// }

// ── Helpers ───────────────────────────────────────────
const el = (id) => document.getElementById(id);

const field = (label, value) => `<p><strong>${label}:</strong> ${value}</p>`;

const card = (header, body) => `
  <div class="card h-100 shadow-sm">
    <div class="card-body">
      ${header}
      ${body}
    </div>
  </div>`;

const append = (container, html) => {
  const div = document.createElement("div");
  div.className = "col";
  div.innerHTML = html;
  container.appendChild(div);
};

// ── Status ────────────────────────────────────────────
export const setStatus = (message, type = "secondary") => {
  const status = el("status");
  status.className = `alert alert-${type} py-2`;
  status.textContent = message;
};

// ── Tournaments ───────────────────────────────────────
export const renderTournament = (output, tournament) => {
  const body = [
    field("Game", tournament.game),
    field("Entry Fee", `$${tournament.entryFee}`),
    field("Max Players", tournament.maxPlayers),
    field("Registered Players", tournament.registeredPlayers),
    field("Status", tournament.status),
    `<button class="btn btn-primary btn-view" data-id="${tournament.id}">
      View Registrations
    </button>`,
  ].join("\n");

  const div = document.createElement("div");
  div.className = "col";
  div.id = `card-${tournament.id}`;
  div.innerHTML = card(`<h5 class="card-title">${tournament.name}</h5>`, body);
  output.appendChild(div);
};

// ── Registrations ─────────────────────────────────────
export const renderRegistration = (container, registration) => {
  append(
    container,
    card(
      `<h5 class="card-title">${registration.playerName}</h5>`,
      [
        field("Ticket", registration.ticketType),
        field("ID", registration.id),
        field("Gamer Tag", registration.gamerTag),
        field("Status", registration.status),
      ].join("\n"),
    ),
  );
};

// ── Summary ───────────────────────────────────────────
export const renderSummary = (container, summary) => {
  container.innerHTML = `
    <div class="card shadow-sm">
      <div class="card-header">
        <h5 class="mb-0">${summary.name}</h5>
      </div>
      <div class="card-body">
        ${field("Total Registrations", summary.totalRegistrationNumber)}
        ${field("Confirmed Players", summary.totalConfirmedNumber)}
        ${field("Expected Revenue", `$${summary.expectedRevenue}`)}
        ${field("Spots Left", summary.spotsLeft)}
      </div>
    </div>`;
};

// ── Clear ─────────────────────────────────────────────
export const clearContent = (output, status, registered, summary, search) => {
  output.innerHTML = `<p class="text-muted col">No tournaments loaded yet.</p>`;
  status.className = "";
  status.innerHTML = `<p class="text-muted fst-italic">Click "Load Tournaments" to see available tournaments.</p>`;
  registered.innerHTML = `<p class="text-muted">Select a tournament above to view registration details.</p>`;
  summary.innerHTML = `<p class="text-muted">No summary on registrations yet.</p>`;
  search.value = "";
};

// What changed and why:
// Extracted field() helper — every <p><strong>Label:</strong> value</p> was copy-pasted across three functions. Now it's one line per field and the pattern is impossible to get inconsistent.
// Extracted card() helper — the card shell HTML was duplicated between renderTournament and renderRegistration. One helper covers both.
// Extracted append() helper — both render functions were doing innerHTML += to add cards, which is a well-known performance and correctness problem: it re-parses the entire container's HTML on every call, destroys and recreates existing DOM nodes (breaking any attached event listeners), and can corrupt partially-formed HTML. appendChild on a freshly created element avoids all of that. renderTournament was also setting an id on the outer div, so it gets its own block rather than using append(), but the same appendChild principle applies.
// Removed the redundant id on the button — btn-${tournament.id} was set on the button but never used anywhere. The data-id attribute is what main.js reads.
// Consistent function style — mixed function declarations and const arrow functions for no apparent reason. Everything is now a const arrow, matching api.js.
// Aligned the clearContent strings — the original had irregular indentation baked into the HTML strings (leading whitespace that ends up in the DOM). Flat single-line strings are cleaner here since none of them need structure.
