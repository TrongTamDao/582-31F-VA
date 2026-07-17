import { Performance } from "./Performance.js";

// FIX: correct DOM selectors to match index.html ids
const performanceContainer = document.getElementById("performance-list");
const statusOutput = document.getElementById("status");
const performanceCount = document.getElementById("performance-count");
const ticketCount = document.getElementById("ticket-count");
const averagePrice = document.getElementById("average-price");

export function renderLoading() {
  // FIX: loading message, not success message
  statusOutput.textContent = "Loading festival data...";

  performanceContainer.innerHTML = "";

  performanceCount.textContent = "0";
  ticketCount.textContent = "0";
  averagePrice.textContent = "$0.00";
}

// FIX: renamed to renderErrors (plural) to match app.js import
export function renderErrors(error) {
  statusOutput.textContent = `Error: ${error.message}`;

  performanceContainer.innerHTML = "";
  performanceCount.textContent = "0";
  ticketCount.textContent = "0";
  averagePrice.textContent = "$0.00";
}

// FIX: renamed parameter to "performances" for clarity
export function renderPerformances(performances) {
  performanceContainer.innerHTML = "";

  // FIX: check array length, not truthiness
  if (!performances || performances.length === 0) {
    statusOutput.textContent = "No performances match the current filters.";
    performanceCount.textContent = "0";
    ticketCount.textContent = "0";
    averagePrice.textContent = "$0.00";
    return;
  }

  performances.forEach((item) => {
    // FIX: correct custom element name "performance-card"
    const card = document.createElement("performance-card");

    // FIX: assign via .performance setter (not .data)
    card.performance = item;

    performanceContainer.appendChild(card);
  });

  statusOutput.textContent = "Festival lineup loaded successfully.";

  // FIX: use local performances array length
  performanceCount.textContent = performances.length;

  // FIX: pass performances array to static method
  ticketCount.textContent = Performance.totalAvailableTickets(performances);

  // FIX: call averagePrice as a static method with argument
  averagePrice.textContent = Performance.averagePrice(performances);
}
