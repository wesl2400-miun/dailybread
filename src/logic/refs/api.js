
/** Lagrar appens API-endpoints.
 * @namespace API
 */
export const API = Object.freeze({

  /** Hämtar en text ur Bibeln baserat på en bibelreferens.
   * @param {string} ref - Bibelreferens.
   */
  bible: (ref) => `https://bible-api.com/${ref}`,

  /** Hämtar plats-data baserat på ortnamn och responsen ska vara på engelska.
   * @param {string} city - Namn på en vald ort.
   */
  location: (city) => `https://nominatim.openstreetmap.org/search?q=${city}&format=json&accept-language=en`,
  
  /** Hämtar dagens väderprognos för en vald ort baserat på latituden och longituden. 
   * Celsius används för att mäta temperaturen och
   * tidszonen väljs automatiskt.
   * @param {string} lat - Latituden för en vald ort.
   * @param {string} lon - Longituden för en vald ort.
   */
  weather: (lat, lon) => `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code&daily=temperature_2m_mean&timezone=auto&temperature_unit=celsius`,
  
  /** Hämtar shabbattider för en vald ort baserat på latituden och longituden.
   * @param {string} lat - Latituden för en vald ort.
   * @param {string} lon - Longituden för en vald ort.
   */
  shabbat: (lat, lon) => `https://www.hebcal.com/shabbat?cfg=json&latitude=${lat}&longitude=${lon}&M=on&leyning=off`,
});

