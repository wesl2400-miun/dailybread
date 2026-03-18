
/** Modellklassen för shabbat-data.
 * @class
 */
export class Shabbat {

  /**
   * @param {string} city - Lagrar ort-data.
   * @param {string} start - Lagrar tiden för shabbatanens början.
   * @param {string} end - Lagrar tiden för shabbatens avslut.
   * @param {number} countdown - Lagrar antalet dagar kvar till shabbaten.
   */
  constructor(city, start, end, countdown) {
    this.city = city;
    this.start = start;
    this.end = end;
    this.countdown = countdown;
  }
}