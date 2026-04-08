import { GetWeather } from "../minor/GetWeather.js";
import { GetShabbat } from "../minor/GetShabbat.js";
import { CalcScore } from "../minor/CalcScore.js";
import { GetBible } from "../minor/GetBible.js";
import { Bible } from "../../models/Bible.js";
import { Shabbat } from "../../models/Shabbat.js";

/** Utför API-anrop för väder och shabbat baserat på data från Location modellen,
 * räknar ut en vers baserat på responsen, skickar bibelreferenserna till bibel-API:n
 * och inkrementerar förloppsindikatorn efter varje API-anrop.
 * @param {Location} location - modell
 * @returns {Promise<{bible: Bible, shabbat: Shabbat}>} - Funktionen är asynkron 
 * och returnerar ett Promise-objekt med bibel- och shabbat-data.
 */
export const pickPrayer = async (location, prog) => {
  const getWeat = new GetWeather(location);
  prog.style.width = '20%';
  const getShabb = new GetShabbat(location);
  const [weathProm, shabbProm] = await Promise.allSettled([
  getWeat.weather(), getShabb.shabbat()]);
  const weather = weathProm.value;
  const shabbat = shabbProm.value;
  prog.style.width = '70%';
  const calcScore = new CalcScore(
  location, weather, shabbat);
  const score = calcScore.score();
  const getBib = new GetBible(score);
  const bible = await getBib.bible();
  prog.style.width = '100%';
  return { bible, shabbat };
}