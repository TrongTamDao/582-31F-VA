export class Team {
  static isValidPoints(points) {
    return typeof points === "number" && points >= 0;
  }

  static fromObject(data) {
    return new Team(
      data.id,
      data.name,
      data.group,
      data.points,
      data.played,
      data.goalDifference,
    );
  }

  constructor(id, name, group, points, played, goalDifference) {
    this._id = id;
    this._name = name;
    this._group = group;
    this._points = points;
    this._played = played;
    this.goalDifference = goalDifference;
  }

  get summary() {
    return `${this._name} - ${this._group} - ${this._points}`;
  }

  set points(value) {
    if (Team.isValidPoints(value)) {
      this._points = value;
    } else throw new Error("Point must be a non-negative number");
  }

  get points() {
    return this._points;
  }
}
