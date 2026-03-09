import { randOpt } from "../../utils/utils.js";
import { EXCERPT } from "../../refs/excerpt.js";
import { BIBLESET } from "../../refs/bibleset.js";
import { WCODES } from "../../data/wcodes.js";
import { LIBZONE } from "../../data/libzone.js";
import { RISKZONE } from "../../data/riskzone.js";
import { GENTILES } from "../../data/gentiles.js";
import { SCEPTICS } from "../../data/sceptics.js";
import { PSALMS } from "../../data/Psalms.js";
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
    if(WCODES.SUN.includes(code)) {
      bibleset.push(EXCERPT.PRAISE);
    } else if(WCODES.CLOUDS.includes(code)) {
      bibleset.push(EXCERPT.DEVOTION);
    } else if(WCODES.RAIN.includes(code)) {
      bibleset.push(EXCERPT.DOUBT);
    } else if(WCODES.SNOW.includes(code)) {
      bibleset.push(EXCERPT.GRUDGE);
    } else if (WCODES.THUNDER.includes(code)) {
      bibleset.push(EXCERPT.DESPAIR);
    }
  }

  _calcTemp = (bibleset) => {
    const { temp } = this._weather;
    if(temp <= 4) {
      bibleset.push(EXCERPT.DESPAIR);
    } else if (temp > 4 && temp <= 15) {
      bibleset.push(EXCERPT.DEVOTION);
    } else if(temp > 15 && temp <= 20) {
      bibleset.push(EXCERPT.PRAISE);
    } else if(temp > 20 && temp <= 25) {
      bibleset.push(EXCERPT.DOUBT);
    } else if(temp > 25) {
      bibleset.push(EXCERPT.TRIAL);
    }
  }

  _calcRegion = (bibleset) => {
    const { region } = this._weather;
    if(SCEPTICS.includes(region)) {
      bibleset.push(EXCERPT.SCEPTICS);
    } else if(GENTILES.includes(region)) {
      bibleset.push(EXCERPT.GENTILES);
    } 
  }

  _calcCountry = (bibleset) => {
    const { country } = this._location;
    if(country === 'Israel') {
      bibleset.push(EXCERPT.JEWS);
    } else if(LIBZONE.includes(country)) {
      bibleset.push(EXCERPT.TRIAL);
    } else if(RISKZONE.includes(country)) {
      bibleset.push(EXCERPT.PERSECUTION);
    }
  }

  _calcShab = (bibleset) => {
    const { countdown } = this._shabbat;
    if(countdown !== 0) return;
    bibleset.push(EXCERPT.SHABBAT);
  }
}