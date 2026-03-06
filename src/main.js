import { CalcScore } from "./logic/features/CalcScore.js";
import { GetBible } from "./logic/features/GetBible.js";
import { GetShabb } from "./logic/features/GetShabb.js";
import { GetWeather } from "./logic/features/GetWeather.js";
import { PickCity } from "./logic/features/PickCity.js";
import { UserReq } from "./logic/models/UserReq.js";


const main = async () => {
  const pickCity = new PickCity(new UserReq('Helsingborg'));
  const location = await pickCity.location();
  console.log(location);
  const getWeather = new GetWeather(location);
  const weather = await getWeather.weather();
  console.log(weather);
  const getShabb = new GetShabb(location);
  const shabbat = await getShabb.shabbat();
  console.log('shabbat ', shabbat)
  const calcScore = new CalcScore(
    location, weather, shabbat);
  const score = calcScore.score();
  console.log('score', score)
  const getBible = new GetBible(score);
  const bible = await getBible.bible();
}

  

await main().catch((error) => {
  console.log(error)
});

