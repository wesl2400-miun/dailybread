import { randOpt } from "../../utils/utils.js";
import { EXCERPT } from "../../refs/excerpt.js";
import { BIBLESET } from "../../refs/bibleset.js";
import { FORECAST } from "../../data/forecast.js";
import { REGION } from "../../data/region.js";
import { PSALMS } from "../../data/psalms.js";
import { WISDOMS } from "../../data/wisdoms.js";
import { Score } from "../../models/Score.js";

export class CalcScore {
  constructor(location, weather, shabbat) {
    this._location = location;
    this._weather = weather;
    this._shabbat = shabbat;
  }

  score = () => {
    const category = this._category();
    const psalmSet = PSALMS.get(category);
    const wisSet = WISDOMS.get(category);
    const wisRef = randOpt(wisSet);
    const psalmRef = 'Psalm' + randOpt(psalmSet);
    return new Score(wisRef, psalmRef);
  }

  _dataFetched = () => {
    return this._location
      && this._shabbat 
      && this._weather;
  }

  _category = () => {
    const allData = this._dataFetched();
    const divFactor = randOpt(BIBLESET);
    if(!allData) return divFactor;
    const bibleset = [];
    this._calculate(bibleset);
    bibleset.push(divFactor);
    return randOpt(bibleset);
  }

  _calculate = (bibleset) => {
    this._calcWCode(bibleset);
    this._calcTemp(bibleset);
    this._calcRegion(bibleset);
    this._calcCountry(bibleset);
    this._calcShab(bibleset);
  }

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

  _calcTemp = (bibleset) => {
    const { temp } = this._weather;
    if(temp <= 4 && temp <= 15) {
      bibleset.push(EXCERPT.STRENGTH);
    } else if(temp > 15 && temp <= 25) {
      bibleset.push(EXCERPT.PRAISE);
    } else if(temp > 25) {
      bibleset.push(EXCERPT.TRIAL);
    }
  }

  _calcRegion = (bibleset) => {
    const { region } = this._weather;
    if(REGION.WEST.includes(region)) {
      bibleset.push(EXCERPT.TRIAL);
    } else if(REGION.EAST.includes(region)) {
      bibleset.push(EXCERPT.PERSECUTION);
    } 
  }

  _calcCountry = (bibleset) => {
    const { country } = this._location;
    if(country === 'Israel') {
      bibleset.push(EXCERPT.ISRAEL);
    }
  }

  _calcShab = (bibleset) => {
    const { countdown } = this._shabbat;
    if(countdown === 0)
      bibleset.push(EXCERPT.SHABBAT);
  }
}