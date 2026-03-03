import { Score } from "./logic/features/Score.js";
import { Weather } from "./logic/features/Weather.js";
import { Location } from "./logic/features/Location.js";
import { Bible } from "./logic/features/Bible.js";
import { element,  } from "./ui/utils/element.js";
import { Shabbat } from "./logic/features/Shabbat.js";

import { CityView } from "./ui/views/CityView.js";

const main = async () => {

  const location = new Location();
  const weather = new Weather();
  const score = new Score();
  const bible = new Bible();
  const shabbat = new Shabbat();
  
  

  const app = element('app');
  const cityView = new CityView(app);
  await cityView.wireForm(location, weather, shabbat);
  

  
}

(async () => { await main(); })();

