export class Performance {
  constructor(id, title, artist, stage, time, ticketPrice, ticketsRemaining) {
    this.id = id;
    this.title = title; // FIX: was this.name
    this.artist = artist;
    this.stage = stage; // FIX: was assigned time
    this.time = time; // FIX: was assigned stage
    this.ticketPrice = Number(ticketPrice); // FIX: was String()
    this.ticketsRemaining = Number(ticketsRemaining); // FIX: was String()
  }

  // FIX: call toFixed(2) as a method with argument
  get formattedPrice() {
    return `$${this.ticketPrice.toFixed(2)}`;
  }

  // FIX: > 0, not < 0
  get hasTickets() {
    return this.ticketsRemaining > 0;
  }

  // FIX: inverted — "Sold out" when no tickets, ticket count when available
  get ticketLabel() {
    if (!this.hasTickets) {
      return "Sold out";
    }
    return `${this.ticketsRemaining} tickets remaining`;
  }

  // FIX: base class is regular lineup
  get lineupLabel() {
    return "Regular lineup";
  }

  // FIX: reduce initial value must be 0 (number), not ""
  static totalAvailableTickets(performances) {
    return performances.reduce(
      (total, performance) => total + performance.ticketsRemaining,
      0,
    );
  }

  // FIX: divide by performances.length, not performances (array)
  static averagePrice(performances) {
    if (performances.length === 0) {
      return "$0.00";
    }

    const total = performances.reduce(
      (sum, performance) => sum + performance.ticketPrice,
      0,
    );

    return `$${(total / performances.length).toFixed(2)}`;
  }
}
