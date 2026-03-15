import { CONTENT } from "../data/content.js";
import { InfoCard } from "../cards/InfoCard.js";
import { article } from "../utils/element.js";
import { LocCard } from "../cards/LocCard.js"
import { SCREEN } from "../refs/screen.js";
import { load, save } from "../../logic/utils/utils.js";
import { STORAGE } from "../../logic/refs/storage.js";
import { GetLocation } from "../../logic/features/minor/GetLocation.js";
import { pickPrayer } from "../../logic/features/major/pick-prayer.js";

export class LocView {
  constructor(parent) {
    const root = article(parent, null);
    this._initInfo(root);
    this._initLocCard(root);
  }

  _initInfo = (root) => {
    const info = new InfoCard(root);
    info.addTitle('2', CONTENT.CITY_VIEW.TITLE1);
    info.addInfo(CONTENT.CITY_VIEW.ABOUT);
    info.addTitle('3', CONTENT.CITY_VIEW.TITLE2);
    info.addInfo(CONTENT.CITY_VIEW.POLICY);
  }

  _initLocCard = (root) => {
    this._locCard = new LocCard(root);
    const { cityField } 
      = this._locCard.fields();
    const city = load(STORAGE.CITY);
    if(city) cityField.value = city;
  }

  wire = async (refresh) => {
    const { form }  = this._locCard.fields();
    await form.addEventListener('submit', 
      async (event) => {
        event.preventDefault();
        await this._onSubmit(refresh);
    });
  }

  _onSubmit = async (refresh) => {
    const { errTag, cityField, 
      saveCheck, progbar } = this._locCard.fields();
    const getLoc = new GetLocation(
        cityField.value);
    const location 
      = await getLoc.location();
    if(!location) {
      errTag.textContent 
        = CONTENT.LOC_CARD.ERROR;
      return;
    }
    if(saveCheck.checked) {
      save(STORAGE.CITY, 
        cityField.value);
    }
    const { bar, prog } = progbar;
    bar.style.display = 'block'; 
    
    const { bible, 
      shabbat } = await pickPrayer(location, prog);
    refresh(SCREEN.PRAYER, bible, shabbat);
  }
}