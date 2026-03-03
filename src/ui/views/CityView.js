import { CONTENT } from "../../logic/data/content.js";
import { InfoCard } from "../cards/InfoCard.js";
import { article } from "../utils/element.js";
import { LocCard } from "../cards/LocCard.js"

export class CityView {
  constructor(parent) {
    const root = article(parent, null);
    this._initInfo(root);
    this._locCard = new LocCard(root);
  }

  _initInfo = (root) => {
    const info = new InfoCard(root);
    info.addTitle('1', CONTENT.CITY_VIEW.H1);
    info.addInfo(CONTENT.CITY_VIEW.H1_ABOUT);
    info.addTitle('2', CONTENT.CITY_VIEW.H2);
    info.addInfo(CONTENT.CITY_VIEW.H2_ABOUT);
  }
  
  wireForm = async (location, weather, shabbat) => {
    await this._locCard.wire(async(city, save, errMess) => { 
      await location.update(city);
      location.save(save);
      const { error } = location;
      errMess.textContent = error;
      if(error.length > 0) return;
      await Promise.all([
        weather.update(location),
        shabbat.update(location)
      ]);
     
    });
  }
}