import { CONTENT } from "../data/content.js";
import { InfoCard } from "../cards/InfoCard.js";
import { article } from "../utils/element.js";
import { LocCard } from "../cards/LocCard.js"

export class CityView {
  constructor(parent, prayer) {
    this._root = article(parent, null);
    this._prayer = prayer;
    const info = new InfoCard(this._root);
    this._initInfo(info);
    this._locCard = new LocCard(info.root);
    prayer.loadCity(this._locCard);
  }

  _initInfo = (info) => {
    info.addTitle('2', CONTENT.CITY_VIEW.TITLE1);
    info.addInfo(CONTENT.CITY_VIEW.ABOUT);
    info.addTitle('3', CONTENT.CITY_VIEW.TITLE2);
    info.addInfo(CONTENT.CITY_VIEW.POLICY);
  }
  
  wireForm = async (prayView, shabView) => {
    await this._locCard.wire(async(city, save, errMess) => { 
      this._prayer.pickRandom(city, save, 
        errMess, prayView, shabView);
    });
  }
}