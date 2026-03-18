
/** Modelklassen för platsdata.
 * @class
 */
export class Location {

  /** 
   * @param {string} city - Lagrar ort-data.
   * @param {string} country - Lagrar land-data.
   * @param {number} lat - Lagrar latituden för en vald ort.
   * @param {number} lon - Lagrar longituden för en vald ort.
   */
  constructor(city, country, lat, lon) {
    this.city = city;
    this.country = country;
    this.lat = lat;
    this.lon = lon;
  }
}