import { randOpt } from "../utils/randOpt.js";
import { EXCERPT } from "../refs/excerpt.js";
import { BIBLESET } from "../refs/bibleset.js";
import { WCODES } from "../data/wcodes.js";
import { LIBZONE } from "../data/libzone.js";
import { RISKZONE } from "../data/riskzone.js";
import { GENTILES } from "../data/gentiles.js";
import { SCEPTICS } from "../data/sceptics.js";

export class Score {
  constructor() {
    this._bibleset = [];
    this.category = EXCERPT.PRAISE;
  }

  calculate = (weather, location, shabbat) => {
    this._calcWCode(weather);
    this._calcTemp(weather);
    this._calcRegion(weather);
    this._calcCountry(location);
    this._calcShab(shabbat);
    const divFactor = randOpt(BIBLESET);
    this._bibleset.push(divFactor);
    this.category = randOpt(this._bibleset);
    this._bibleset = [];
  }

  _calcWCode = (weather) => {
    const { code } = weather;
    if(WCODES.SUN.includes(code)) {
      this._bibleset.push(EXCERPT.PRAISE);
    } else if(WCODES.CLOUDS.includes(code)) {
      this._bibleset.push(EXCERPT.DEVOTION);
    } else if(WCODES.RAIN.includes(code)) {
      this._bibleset.push(EXCERPT.DOUBT);
    } else if(WCODES.SNOW.includes(code)) {
      this._bibleset.push(EXCERPT.GRUDGE);
    } else if (WCODES.THUNDER.includes(code)) {
      this._bibleset.push(EXCERPT.DESPAIR);
    }
  }

  _calcTemp = (weather) => {
    const { temp } = weather;
    if(temp <= 4) {
      this._bibleset.push(EXCERPT.DESPAIR);
    } else if (temp > 4 && temp <= 15) {
      this._bibleset.push(EXCERPT.DEVOTION);
    } else if(temp > 15 && temp <= 20) {
      this._bibleset.push(EXCERPT.PRAISE);
    } else if(temp > 20 && temp <= 25) {
      this._bibleset.push(EXCERPT.DOUBT);
    } else if(temp > 25) {
      this._bibleset.push(EXCERPT.TRIAL);
    }
  }

  _calcRegion = (weather) => {
    const { region } = weather;
    if(SCEPTICS.includes(region)) {
      this._bibleset.push(EXCERPT.SCEPTICS);
    } else if(GENTILES.includes(region)) {
      this._bibleset.push(EXCERPT.GENTILES);
    } 
  }

  _calcCountry = (location) => {
    const { country } = location;
    if(country === 'Israel') {
      this._bibleset.push(EXCERPT.JEWS);
    } else if(LIBZONE.includes(country)) {
      this._bibleset.push(EXCERPT.TRIAL);
    } else if(RISKZONE.includes(country)) {
      this._bibleset.push(EXCERPT.PERSECUTION);
    }
  }

  _calcShab = (shabbat) => {
    const { countdown } = shabbat;
    console.log(this._bibleset);
    if(countdown !== 0) return;
    this._bibleset.push(EXCERPT.SHABBAT);
    console.log(this._bibleset);
  }
}