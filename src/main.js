import { Score } from "./logic/features/minor/Score.js";
import { Weather } from "./logic/features/minor/Weather.js";
import { Location } from "./logic/features/minor/Location.js";
import { Bible } from "./logic/features/minor/Bible.js";
import { element,  } from "./ui/utils/element.js";
import { Shabbat } from "./logic/features/minor/Shabbat.js";

import { APP_ID, FOOTER_ID } from "./ui/refs/refs.js";
import { AppView } from "./ui/views/AppView.js";

const main = async () => {
  const location = new Location();
  const weather = new Weather();
  const shabbat = new Shabbat();
  const bible = new Bible();
  const score = new Score();
  
  const footer = element(FOOTER_ID);
  const app = element(APP_ID);
  const appView = new AppView(app, footer);
  appView.features(location, weather, 
    shabbat, bible, score);
  await appView.start();
}

  

await main().catch((error) => {
  console.log(error)
});

