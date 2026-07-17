import { Performance } from "./Performance.js";

export class FeaturedPerformance extends Performance {
  constructor(
    id,
    title,
    artist,
    stage,
    time,
    ticketPrice,
    ticketsRemaining,
    featured,
  ) {
    // FIX: super() must come first; args must match Performance constructor order
    super(id, title, artist, stage, time, ticketPrice, ticketsRemaining);

    // FIX: featured should be true for a FeaturedPerformance
    this.featured = true;
  }

  // FIX: override to return "Featured performance" (base class returns "Regular lineup")
  get lineupLabel() {
    return "Featured performance";
  }
}
