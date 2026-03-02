
export class Prayer {
  constructor(location, 
    weather, bible, score, error) {
    this._location = location;
    this._weather = weather;
    this._bible = bible;
    this._score = score;
    this._error = error;
  }

  init = async (city, save) => {
    await this._location
      .update(city, this._error);
      this._location.save(save);
    await this._weather
      .update(this._location);
  }

  pickRandom = async () => {
    this._score.calculate(
      this._weather, this._location);
    await this._bible.update(this._score);
  }

  display = () => {
    console.log(this._bible.advice);
    console.log(this._bible.psalm);
  }
}