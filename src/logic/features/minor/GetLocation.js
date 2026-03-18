import { cityNotFound, getCountry, formatCity } from "../../utils/utils.js";
import { Location } from "../../models/Location.js";
import { query } from "../../utils/utils.js";
import { API } from "../../refs/api.js";

/**
 * Utför API-anrop till plats-API:n och lagrar resultatet i Location-modellklassen.
 * @class
 */
export class GetLocation {

  /**
   * @param {string} userCity - Värdet för orten som kommer från formulärfältet i LocView-vyn
   */
  constructor(userCity) {
    this._userCity = userCity;
  }

  /** Hämtar plats-data från plats-API:n.
   * @private
   * @returns {Promise<Object|null>} - Detta är en asynkron funktion
   * som returnerar ett Promise-Objekt med 
   * antingen ett objekt med plats-data för en utvald ort eller ett null-värde
   * om API-anropet har misslyckats.
   */
  _fromAPI = async () => {
    if(!this._userCity) return null;
    const data = await query(
      API.location(this._userCity));
    return data[0] || null;
  }

  /**
   * Bearbetar resultatet från plats-API:n och returnerar 
   * det som ett Location-objekt.
   * @private
   * @param {Object} result - resultatet från plats-API:n
   * @returns {Location} - Returnerar Location-modellklassen med strängar
   * som innehåller information om en utvald ort, koordinaterna för den 
   * samt landet den befinner sig i.
   */
  _unpackLoc = (result) => {
    const { display_name, 
      lat, lon } = result;
    const cityInfo = display_name
      .split(', ')[0] || '';
    const city = formatCity(cityInfo);
    const country = getCountry(display_name);
    return new Location(city, 
      country, lat, lon);
  }

  /** Utför ett API-anrop till plats-API:n, bearbetar resultatet och
   * returnerar det i ett Location-objekt eller returnerar ett nullvärde
   * om API-anropet har misslyckats.
   * @returns {Promise<Location|null >} - Detta är en asynkron funktion som 
   * returnerar ett Promise-objekt med plats-data.
   */
  location = async () => {
    const result = await this._fromAPI();
    if(!result) return null;
    const fromAPI = this._unpackLoc(result);
    const notFound = cityNotFound(
      this._userCity, fromAPI.city);
    if(notFound) return null;
    return fromAPI;
  }
}