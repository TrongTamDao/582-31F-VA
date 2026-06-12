export class TournamentSummary {
  constructor(
    name,
    totalRegistrationNumber,
    totalConfirmedNumber,
    expectedRevenue,
    spotsLeft,
  ) {
    this.name = name;
    this.totalRegistrationNumber = totalRegistrationNumber;
    this.totalConfirmedNumber = totalConfirmedNumber;
    this.expectedRevenue = expectedRevenue;
    this.spotsLeft = spotsLeft;
  }
}
