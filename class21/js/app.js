import getFestivalData from "./api.js";
import { Artist } from "./Artist.js";
import { Performance } from "./Performance.js";
import { FeaturedPerformance } from "./FeaturedPerformance.js";
import "./PerformanceCard.js";
import { renderLoading, renderErrors, renderPerformances } from "./ui.js";

// FIX: correct DOM selectors matching index.html
const loadButton = document.getElementById("load-lineup");
const searchInput = document.getElementById("search-input");
const stageFilter = document.getElementById("stage-filter");
const ticketsFilter = document.getElementById("tickets-filter");
const featuredFilter = document.getElementById("featured-filter");
const sortSelect = document.getElementById("sort-select");
const resetButton = document.getElementById("reset-filters");

// FIX: keep two arrays — source never gets overwritten by filtering
let allPerformances = [];

async function loadLineup() {
  // FIX: call renderLoading() with parentheses
  renderLoading();

  loadButton.disabled = true;

  try {
    // FIX: await getFestivalData()
    const data = await getFestivalData();

    const artists = data.artists.map(
      (item) => new Artist(item.id, item.name, item.country, item.genre),
    );

    allPerformances = data.performances.map((item) => {
      // FIX: use find() to get ONE matching artist object (not filter which returns array)
      const artist = artists.find((a) => a.id === item.artistId) ?? null;

      if (item.featured) {
        return new FeaturedPerformance(
          item.id,
          item.title,
          artist,
          item.stage,
          item.time,
          item.ticketPrice,
          item.ticketsRemaining,
          item.featured,
        );
      }

      return new Performance(
        item.id,
        item.title,
        artist,
        item.stage,
        item.time,
        item.ticketPrice,
        item.ticketsRemaining,
      );
    });

    // Sort by time initially
    allPerformances.sort((a, b) => a.time.localeCompare(b.time));

    renderPerformances(allPerformances);

    // Enable all controls after successful load
    searchInput.disabled = false;
    stageFilter.disabled = false;
    ticketsFilter.disabled = false;
    featuredFilter.disabled = false;
    sortSelect.disabled = false;
    resetButton.disabled = false;

    // FIX: re-enable load button after success (original kept it disabled)
    loadButton.disabled = false;
  } catch (error) {
    // FIX: use console.error (not console.log) for errors
    console.error("Lineup load failed:", error);
    renderErrors(error);

    // FIX: re-enable load button so user can retry
    loadButton.disabled = false;
  }
}

function applyFilters() {
  // FIX: trim search term for clean comparison
  const searchTerm = searchInput.value.trim().toLowerCase();
  const stage = stageFilter.value;
  // FIX: checkboxes use .checked not .value
  const availableOnly = ticketsFilter.checked;
  const featuredOnly = featuredFilter.checked;
  const sort = sortSelect.value;

  // FIX: filter on allPerformances (source), not overwrite performances
  let filtered = allPerformances.filter((performance) => {
    // FIX: case-insensitive search on both title and artist name
    const matchesSearch =
      searchTerm === "" ||
      performance.title.toLowerCase().includes(searchTerm) ||
      (performance.artist &&
        performance.artist.name.toLowerCase().includes(searchTerm));

    // FIX: compare performance.stage not performance.time
    const matchesStage = stage === "" || performance.stage === stage;

    // FIX: check ticketsRemaining > 0
    const matchesTickets = !availableOnly || performance.ticketsRemaining > 0;

    // FIX: check instanceof FeaturedPerformance (not Performance)
    const matchesFeatured =
      !featuredOnly || performance instanceof FeaturedPerformance;

    // FIX: AND logic — all conditions must match
    return matchesSearch && matchesStage && matchesTickets && matchesFeatured;
  });

  // FIX: sort on a copy so source order is not affected
  filtered = [...filtered];

  // FIX: time sort
  if (sort === "time-asc") {
    filtered.sort((a, b) => a.time.localeCompare(b.time));
  }

  // FIX: numeric sort using subtraction (not > or <)
  if (sort === "price-asc") {
    filtered.sort((a, b) => a.ticketPrice - b.ticketPrice);
  }

  if (sort === "price-desc") {
    filtered.sort((a, b) => b.ticketPrice - a.ticketPrice);
  }

  // FIX: string sort using localeCompare (not subtraction)
  if (sort === "artist-asc") {
    filtered.sort((a, b) =>
      (a.artist?.name ?? "").localeCompare(b.artist?.name ?? ""),
    );
  }

  renderPerformances(filtered);
}

function resetFilters() {
  searchInput.value = "";
  stageFilter.value = "";
  // FIX: use .checked = false for checkboxes (not .value)
  ticketsFilter.checked = false;
  featuredFilter.checked = false;
  sortSelect.value = "time-asc";

  // FIX: call applyFilters() with parentheses
  applyFilters();
}

// FIX: pass function references — no () — so they don't run immediately
loadButton.addEventListener("click", loadLineup);

// FIX: "input" event for live search while typing (not "change")
searchInput.addEventListener("input", applyFilters);

stageFilter.addEventListener("change", applyFilters);

ticketsFilter.addEventListener("change", applyFilters);

featuredFilter.addEventListener("change", applyFilters);

sortSelect.addEventListener("change", applyFilters);

resetButton.addEventListener("click", resetFilters);
