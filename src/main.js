import { Score } from "./logic/features/minor/Score.js";
import { Weather } from "./logic/features/minor/Weather.js";
import { Location } from "./logic/features/minor/Location.js";
import { Bible } from "./logic/features/minor/Bible.js";
import { element,  } from "./ui/utils/element.js";
import { Shabbat } from "./logic/features/minor/Shabbat.js";
import { Prayer } from "./logic/features/major/Prayer.js";
import { CityView } from "./ui/views/CityView.js";
import { PrayView } from "./ui/views/PrayView.js";
import { ShabView } from "./ui/views/ShabView.js";

const main = async () => {
  const location = new Location();
  const weather = new Weather();
  const score = new Score();
  const bible = new Bible();
  const shabbat = new Shabbat();

  const prayer = new Prayer(
    location, weather,
    shabbat, bible, score);

  const footer = element('footer');
  const main = element('main');

  const shabView = new ShabView(footer);
  const prayView = new PrayView(main, prayer);
  const cityView = new CityView(main, prayer);
  await cityView.wireForm(prayView, shabView);
}

await main().catch((error) => {
  console.log(error)
});

