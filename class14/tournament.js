export class Tournament {
  constructor(id, name, game, entryFee, maxPlayers, registeredPlayers, status) {
    this.id = id;
    this.name = name;
    this.game = game;
    this.entryFee = entryFee;
    this.registeredPlayers = registeredPlayers;
    this.maxPlayers = maxPlayers;
    this.status = status;
  }

  get spotsLeft() {
    return this.maxPlayers - this.registeredPlayers;
  }

  set maxPlayers(value) {
    if (value <= 0) {
      throw new Error("Invalid max players");
    }

    if (value < this.registeredPlayers) {
      throw new Error("Max players cannot be less than registered players");
    }

    this._maxPlayers = value;
  }

  get maxPlayers() {
    return this._maxPlayers;
  }

  static fromObject(data) {
    return new Tournament(
      data.id,
      data.name,
      data.game,
      data.entryFee,
      data.maxPlayers,
      data.registeredPlayers,
      data.status,
    );
  }
}

export class FeaturedTournament extends Tournament {
  constructor(
    id,
    name,
    game,
    entryFee,
    maxPlayers,
    registeredPlayers,
    status,
    features,
  ) {
    super(id, name, game, entryFee, maxPlayers, registeredPlayers, status);
    this.features;
  }
}

export class PremiumTournament extends Tournament {
  constructor(
    id,
    name,
    game,
    entryFee,
    maxPlayers,
    registeredPlayers,
    status,
    premium,
  ) {
    super(id, name, game, entryFee, maxPlayers, registeredPlayers, status);
    this.premium;
  }
}
