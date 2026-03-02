import { Score } from "./logic/features/Score.js";
import { Weather } from "./logic/network/Weather.js";
import { Location } from "./logic/network/Location.js";
import { Error } from "./logic/features/Error.js";
import { Bible } from "./logic/network/Bible.js";

const main = async () => {

  const error = new Error();
  const location = new Location();
  await location.update('Helsingborg', error);
  console.log(location.country)
  const weather = new Weather();
  await weather.update(location);
  console.log(weather, location);
  const score = new Score();
  score.calculate(weather, location);
  const bible = new Bible();
  await bible.update(score);
  console.log(bible);


}

(async () => { await main(); })();

