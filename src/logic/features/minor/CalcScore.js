import { randOpt } from "../../utils/utils.js";
import { EXCERPT } from "../../refs/excerpt.js";
import { BIBLESET } from "../../refs/bibleset.js";
import { FORECAST } from "../../data/forecast.js";
import { REGION } from "../../data/region.js";
import { PSALMS } from "../../data/psalms.js";
import { WISDOMS } from "../../data/wisdoms.js";
import { Score } from "../../models/Score.js";
import { Shabbat } from "../../models/Shabbat.js";

/** Räknar ut bibelverser baserat på väder-, shabbat- och plats-data.
 * @class
 */
export class CalcScore {

  /**
   * @param {Location} location - Modelleklassen för plats-data.
   * @param {Weather} weather - Modellklassen för väder-data.
   * @param {Shabbat} shabbat - Modellklassen för shabbat-data.
   */
  constructor(location, weather, shabbat) {
    this._location = location;
    this._weather = weather;
    this._shabbat = shabbat;
  }

  /**
   * @returns {Score<string, string>} - Returnerar bibelreferenser baserat på kategori; 
   * en från Nya Testamentet och en från Psalmboken.
   */
  score = () => {
    const category = this._category();
    const psalmSet = PSALMS.get(category);
    const wisSet = WISDOMS.get(category);
    const wisRef = randOpt(wisSet);
    const psalmRef = 'Psalm' + randOpt(psalmSet);
    return new Score(wisRef, psalmRef);
  }

  /**
   * @private
   * @returns {boolean} - Boolean-värdet som anger om data från API:er har hämtats eller inte.
   */
  _dataFetched = () => {
    return this._location
      && this._shabbat 
      && this._weather;
  }

  /** Räknar ut bibelkategorin från vilken bibelverser ska senare hämtas.
   * @private
   * @returns {EXCERPT} - Returnerar EXCERPT-flaggan som används senare
   * som nyckelord för att hämta bibelreferenser från den utvalda kategorin.
   */
  _category = () => {
    const allData = this._dataFetched();
    const divFactor = randOpt(BIBLESET);
    if(!allData) return divFactor;
    const bibleset = [];
    this._calculate(bibleset);
    bibleset.push(divFactor);
    return randOpt(bibleset);
  }

  /** Räknar ut kategorin för bibelverser baserat på väderkoder, 
   * temperatur, region, land och shabbattider.
   * @private
   * @param {EXCERPT[]} bibleset - En lista med enum nycklar för olika bibelverskategorier
   * ur vilken en slumpmässig kategori väljs.
   */
  _calculate = (bibleset) => {
    this._calcWCode(bibleset);
    this._calcTemp(bibleset);
    this._calcRegion(bibleset);
    this._calcCountry(bibleset);
    this._calcShab(bibleset);
  }

  /** Räknar ut kategorin för bibelverser baserat på väderkoder.
   * @private
   * @param {EXCERPT[]} bibleset - En lista med enum nycklar för olika bibelverskategorier
   * ur vilken en slumpmässig kategori väljs.
   */
  _calcWCode = (bibleset) => {
    const { code } = this._weather;
    if(FORECAST.GOOD.includes(code)) {
      bibleset.push(EXCERPT.PRAISE);
    } else if(FORECAST.BAD.includes(code)) {
      bibleset.push(EXCERPT.STRENGTH);
    } else if(FORECAST.TERRIBLE.includes(code)) {
      bibleset.push(EXCERPT.TRIAL);
    } 
  }

  /** Räknar ut kategorin för bibelverser baserat på temperatur.
   * @private
   * @param {EXCERPT[]} bibleset - En lista med enum nycklar för olika bibelverskategorier
   * ur vilken en slumpmässig kategori väljs.
   */
  _calcTemp = (bibleset) => {
    const { temp } = this._weather;
    if(temp <= 15) {
      bibleset.push(EXCERPT.STRENGTH);
    } else if(temp > 15 && temp <= 25) {
      bibleset.push(EXCERPT.PRAISE);
    } else if(temp > 25) {
      bibleset.push(EXCERPT.TRIAL);
    }
  }

   /** Räknar ut kategorin för bibelverser baserat på region.
    * @private
    * @param {EXCERPT[]} bibleset - En lista med enum nycklar för olika bibelverskategorier
    * ur vilken en slumpmässig kategori väljs.
   */
  _calcRegion = (bibleset) => {
    const { region } = this._weather;
    if(REGION.WEST.includes(region)) {
      bibleset.push(EXCERPT.TRIAL);
    } else if(REGION.EAST.includes(region)) {
      bibleset.push(EXCERPT.PERSECUTION);
    } 
  }

   /** Räknar ut kategorin för bibelverser baserat på land.
    * @private
    * @param {EXCERPT[]} bibleset - En lista med enum nycklar för olika bibelverskategorier
    * ur vilken en slumpmässig kategori väljs.
   */
  _calcCountry = (bibleset) => {
    const { country } = this._location;
    if(country === 'Israel') {
      bibleset.push(EXCERPT.ISRAEL);
    }
  }

   /** Räknar ut kategorin för bibelverser baserat på shabbat.
    * @private
    * @param {EXCERPT[]} bibleset - En lista med enum nycklar för olika bibelverskategorier
    * ur vilken en slumpmässig kategori väljs.
   */
  _calcShab = (bibleset) => {
    const { countdown } = this._shabbat;
    if(countdown === 0)
      bibleset.push(EXCERPT.SHABBAT);
  }
}