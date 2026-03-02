import { Score } from "./logic/engine/Score.js";
import { Weather } from "./logic/network/Weather.js";
import { Location } from "./logic/network/Location.js";
import { Error } from "./logic/errors/Error.js";
import { Bible } from "./logic/network/Bible.js";
import { Prayer } from "./logic/features/Prayer.js";

const main = async () => {

  const error = new Error();
  const location = new Location();
  const weather = new Weather();
  const score = new Score();
  const bible = new Bible();
  
  const prayer = new Prayer(location, 
    weather, bible, score, error);
  await prayer.init('Helsingborg');
  await prayer.pickRandom();
  prayer.display();
}

(async () => { await main(); })();

