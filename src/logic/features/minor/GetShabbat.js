import { Shabbat } from "../../models/Shabbat.js";
import { query } from "../../utils/utils.js";
import { API } from "../../refs/api.js";
import { parseISO, differenceInCalendarDays } from "date-fns";

/** Utför ett API-anrop till shabbat- och kalender-API:n samt
 *  lagrar resultatet i Shabbat-modellklassen.
 * @class
 */
export class GetShabbat {

  /**
   * @param {Location} location - Plats-data som lagras via GetLocation klassen.
   */
  constructor(location) {
    this._location = location;
  }

  /** Utför ett API-anrop till kalender-API:n, bearbetar resultatet 
   * för shabbat-tider och kalendern samt returnerar det som ett Shabbat-objekt.
   * @private
   * @param {string} city - En sträng med ort-data.
   * @param {Object} result - Resultatet från plats-API:n.
   * @returns {Promise<Shabbat|null>} - Detta är en asynkron funktion som returnerar
   * ett Promise-objekt med shabbat-data eller ett nullvärde om API-anropet har misslyckats.
   */
  _unpackShab = async (city, result) => {
    const { items } = result;
    const start = this._time(
      items, 'candles');
    const end = this._time(
      items, 'havdalah');
    const countdown = 
      this._countdown(start.day);
    return new Shabbat(city,
      `${start.title} ${start.day}`,
      `${end.title} ${end.day}`,
       countdown);
  }

  /** Utför ett API-anrop till shabbat-API:n och returnerar resultatet i ett Shabbat-objekt.
   * @returns {Promise<Shabbat|null>} - Detta är en asynkron funktion som returnerar
   * ett Promise-objekt med shabbat-data eller ett nullvärde om API-anropet har misslyckats.
   */
  shabbat = async () => {
    if(!this._location) return null;
    const { city, lat, 
      lon } = this._location;
    const result = await 
      query(API.shabbat(lat, lon));
    if(result.error) return null;
    return await this._unpackShab(
      city, result);
  }

   /** Bearbetar listan från API-resultatet baserat på en utvald kategori
    * och returnerar ett objekt med en titel och ett datum i formatet år-månad-dag.
    * @private
    * @param {[]} items - Listan från API-resultatet
    * @param {string} category - Kategorin som syftar på om tiden gäller shabbat-början
    * (engelska: Candle Lighting) eller shabbat-avslut (hebreiska: Havdalah).
    * @returns {{title: string, day: string}} - title-strängen informerar om
    * datumet gäller början eller avslutet på shabbat-tiden.
    */
  _time = (items, category) => {
    if(items.length === 0) return {
      title: '', day: ''};
    const time = items.filter(item => 
      item.category === category)[0];
    const { title, date } = time;
    const day = date.split('T')[0];
    return { title, day };
  }

  /** Räknar ut hur många dagar som finns kvar till shabbatdagen
   * baserat på informationen från Hebcal-API:n
   * Använder funktionerna parseISO och differenceInCalenderDays
   * för att se till datumen stämmer med tidszonen och beräkningen är korrekt.
   * @private
   * @param {string} date - Lagrar datumet i formatet år-månad-dag.
   * @returns {number} - Returnerar antalet dagar kvar till shabbaten;
   */
  _countdown = (date) => {
    const today = new Date();
    const shabDay = parseISO(date);
    const countdown = differenceInCalendarDays(
      shabDay, today);
      console.log(countdown)
    return countdown;
  }
}