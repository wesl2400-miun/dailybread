import { query } from "../../utils/utils.js";
import { API } from "../../refs/api.js";
import { Weather } from "../../models/Weather.js";

/** Utför ett API-anrop till väder-API:n och lagrar resultatet i Weather-modellklassen.
 * @class
 */
export class GetWeather {

  /**
   * @param {Location} location - Plats-data som lagras via GetLocation klassen.
   */
  constructor(location) {
    this._location = location;
  }

  /** Bearbetar resultatet från väder-API:n och returnerar det som ett Weather-objekt.
   * @private
   * @param {Object} result - Resultatet från väder-API:n.
   * @returns {Weather} - Returnerar väder-data.
   */
  _unpackWeath = (result) => {
    const { daily, timezone } = result;
    const { temperature_2m_mean, 
      weather_code } = daily;
    const now = weather_code[0];
    const temp = temperature_2m_mean[0];
    const code = now;
    const region = timezone
      .split('/')[0];
    return new Weather(
      temp, code, region);
  }

  /** Utför ett API-anrop till väder-API:n och returnerar antingen resultatet från API:n
   * som ett Weather-objekt eller ett Weather-objekt med hårdkodade värden.
   * @returns {Promise<Weather>} - Detta är en asynkron funktion som returnerar
   * ett Promise-objekt med väder-data som antingen kommer från API:n
   * eller är hårdkodad i Weather-klassen om API-anropet har misslyckats.
   */
  weather = async () => {
    if(!this._location) 
      return new Weather();
    const { lat, 
      lon } = this._location;
    const result = await query(
      API.weather(lat, lon));
    if(result.error) 
      return new Weather();
    return this._unpackWeath(result);
  }
}