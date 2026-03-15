import { GetLocation } from "../minor/GetLocation.js";
import { GetWeather } from "../minor/GetWeather.js";
import { GetShabbat } from "../minor/GetShabbat.js";
import { CalcScore } from "../minor/CalcScore.js";
import { GetBible } from "../minor/GetBible.js";
 
export const pickPrayer = async (location, prog) => {
  const getWeat = new GetWeather(location);
  prog.style.width = '20%';
  const getShabb = new GetShabbat(location);
  const [weather, shabbat] = await Promise.all([
  getWeat.weather(), getShabb.shabbat()]);
  prog.style.width = '70%';
  const calcScore = new CalcScore(
  location, weather, shabbat);
  const score = calcScore.score();
  const getBib = new GetBible(score);
  const bible = await getBib.bible();
  prog.style.width = '100%';;
  return { bible, shabbat };
}