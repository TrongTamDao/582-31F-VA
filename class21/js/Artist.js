export class Artist {
  constructor(id, name, country, genre) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.genre = genre;
  }

  // FIX: use this.name and this.country (not this.artistName and this.genre)
  get displayLabel() {
    return `${this.name} — ${this.country}`;
  }
}
