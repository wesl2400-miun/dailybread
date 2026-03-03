import { Score } from "./logic/engine/Score.js";
import { Weather } from "./logic/network/Weather.js";
import { Location } from "./logic/network/Location.js";
import { Error } from "./logic/errors/Error.js";
import { Bible } from "./logic/network/Bible.js";
import { Prayer } from "./logic/features/major/Prayer.js";
import { InfoCard } from "./ui/cards/InfoCard.js";
import { element, listItem, paragraph } from "./ui/utils/element.js";
import { ListCard } from "./ui/cards/ListCard.js";
import { LocCard } from "./ui/cards/LocCard.js";
import { Shabbat } from "./logic/network/Shabbat.js";
import { ShabTimes } from "./logic/features/minor/ShabTimes.js";

const main = async () => {

  const error = new Error();
  const location = new Location();
  const weather = new Weather();
  const score = new Score();
  const bible = new Bible();
  const shabbat = new Shabbat();

  const shabTimes = new ShabTimes(
    location, shabbat);
  
  const prayer = new Prayer(location, 
    weather, shabbat, bible, score, error);
  await prayer.init('Helsingborg');
  await prayer.pickRandom();
  prayer.display();
  shabTimes.display();
  

  const app = element('app');
  const infoCard = new InfoCard(app);
  infoCard.addTitle('2', 'Hello world!');
  infoCard.addInfo('Everything about hello world.');
  infoCard.addTitle('3', 'Tralala');
  infoCard.addInfo('Here is something about tralala.')

  const listCard = new ListCard(app, '3', 'List');
  const item = listItem();
  paragraph(item, 'Henlou')
  listCard.addItem(item)

  const func = (loc, sav, errMess) => {
    errMess.textContent = loc + ' ' + sav;
  }
  const locCard = new LocCard(app);
  locCard.wire(func)
  
}

(async () => { await main(); })();

