import { GetLocation } from "../minor/GetLocation.js";
import { GetWeather } from "../minor/GetWeather.js";
import { GetShabbat } from "../minor/GetShabbat.js";
import { CalcScore } from "../minor/CalcScore.js";
import { GetBible } from "../minor/GetBible.js";
 
export const pickPrayer = async (location) => {
  const getWeat = new GetWeather(location);
  const getShabb = new GetShabbat(location);
  const [weather, shabbat] = await Promise.all([
  getWeat.weather(), getShabb.shabbat()]);
  const calcScore = new CalcScore(
  location, weather, shabbat);
  const score = calcScore.score();
  const getBib = new GetBible(score);
  const bible = await getBib.bible();
  return { bible, shabbat };
}