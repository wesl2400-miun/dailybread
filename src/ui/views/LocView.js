import { CONTENT } from "../data/content.js";
import { InfoCard } from "../cards/InfoCard.js";
import { article } from "../utils/element.js";
import { LocCard } from "../cards/LocCard.js"
import { SCREEN } from "../refs/screen.js";
import { load, save } from "../../logic/utils/utils.js";
import { STORAGE } from "../../logic/refs/storage.js";
import { GetLocation } from "../../logic/features/minor/GetLocation.js";
import { pickPrayer } from "../../logic/features/major/pick-prayer.js";
import { Bible } from "../../logic/models/Bible.js";
import { Shabbat } from "../../logic/models/Shabbat.js";

/** Platsvyn - innehåller informationen om appen samt ett formulär för plats.
 * @class
 */
export class LocView {

  /** Platsvyn - innehåller informationen om appen samt ett formulär för plats.
   * @param {HTMLElement} parent - Element som vyn ska kopplas till.
   */
  constructor(parent) {
    const root = article(parent);
    this._initInfo(root);
    this._initLocCard(root);
  }

  /** Skapar informationskort för vyn.
   * @private
   * @param {HTMLElement} root - Element som informationskort ska kopplas till.
   */
  _initInfo = (root) => {
    const info = new InfoCard(root);
    info.addTitle('2', CONTENT.CITY_VIEW.TITLE1);
    info.addInfo(CONTENT.CITY_VIEW.ABOUT);
    info.addTitle('3', CONTENT.CITY_VIEW.TITLE2);
    info.addInfo(CONTENT.CITY_VIEW.POLICY);
  }

   /** Skapar och initierar formulärfältet för plats. Laddar också en sparad
    * plats från localStorage.
    * @private
    * @param {HTMLElement} root - Element som informationskort ska kopplas till.
    */
  _initLocCard = (root) => {
    this._locCard = new LocCard(root);
    const { cityField } 
      = this._locCard.fields();
    const city = load(STORAGE.CITY);
    if(city) cityField.value = city;
  }

  /** Tilldelar händelsen för formulärfältet när 'submit' eller 'enter'-knappen trycks.
   * @param {(screen: SCREEN, bible: Bible, shabbat: Shabbat)} refresh - 
   * Callback-funktion som kallas i App-klassen och
   * bestämmer vilken vy som ska visas och vad som ska ske under processen.
   */
  wire = (refresh) => {
    const { form }  = this._locCard.fields();
    form.addEventListener('submit', 
      async (event) => {
        event.preventDefault();
        await this._onSubmit(refresh);
    });
  }

   /** Kallas när 'submit'-knappen trycks.
   * @private
   * @param {(screen: SCREEN, bible: Bible, shabbat: Shabbat)} refresh - 
   * Callback-funktion som kallas i App-klassen och
   * bestämmer vilken vy som ska visas och vad som ska ske under processen.
   * @returns {Promise<void>} - Asynkron funktion som returnerar ett Promise-objekt.
   */
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