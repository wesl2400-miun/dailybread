
export class Prayer {
  constructor(location, weather, 
    shabbat, bible, score, error) {
    this._location = location;
    this._weather = weather;
    this._shabbat = shabbat;
    this._bible = bible;
    this._score = score;
    this._error = error;
  }

  init = async (city, save) => {
    await this._location
      .update(city, this._error);
      this._location.save(save);
    await Promise.all([
      this._weather.update(this._location),
      this._shabbat.update(this._location)
    ]);
  }

  pickRandom = async () => {
    this._score.calculate(this._weather, 
      this._location, this._shabbat);
    await this._bible.update(this._score);
  }

  error = () => this._error.message;

  display = () => {
    console.log(this._bible.advice);
    console.log(this._bible.psalm);
  }
}