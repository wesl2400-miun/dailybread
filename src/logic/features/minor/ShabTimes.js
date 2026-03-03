
export class ShabTimes {
  constructor(location, shabbat) {
    this._location = location;
    this._shabbat = shabbat;
  }

  display = () => {
    const { start, end, countdown } = this._shabbat;
    console.log(start, end, countdown);
  }
}