import { randOpt } from "../utils/randOpt.js";
import { EXCERPT } from "../refs/excerpt.js";

export class Score {
  constructor() {
    this._outcome = [];
    this.category = EXCERPT.PRAISE;
  }

  calculate = (weather, location) => {
    this._calcWCode(weather);
    this._calcTemp(weather);
    this._calcRegion(weather);
    this._calcCountry(location);
    const divFactor = [ 
      EXCERPT.PRAISE, EXCERPT.DEVOTION, 
      EXCERPT.DOUBT, EXCERPT.GRUDGE, 
      EXCERPT.DESPAIR, EXCERPT.TRIAL, 
      EXCERPT.PERSECUTION, EXCERPT.JEWS, 
      EXCERPT.GENTILES, EXCERPT.HEATHENS];
    this._outcome.push(randOpt(divFactor));
    this.category = randOpt(this._outcome);
    this._outcome = [];
  }

  _calcWCode = (weather) => {
    const { code } = weather;
    console.log(code);
    const sun = [0, 1, 2];
    const clouds = [ 3, 45, 48];
    const rain = [51, 53, 55, 56, 57, 
      61, 63, 65, 66, 67, 80, 81, 82];
    const snow = [71, 73, 75, 77, 85, 86];
    const thunder = [95, 96, 99];
    if(sun.includes(code)) {
      this._outcome.push(EXCERPT.PRAISE);
    } else if(clouds.includes(code)) {
      this._outcome.push(EXCERPT.DEVOTION);
    } else if(rain.includes(code)) {
      this._outcome.push(EXCERPT.DOUBT);
    } else if(snow.includes(code)) {
      this._outcome.push(EXCERPT.GRUDGE);
    } else if (thunder.includes(code)) {
      this._outcome.push(EXCERPT.DESPAIR);
    }
  }

  _calcTemp = (weather) => {
    const { temp } = weather;
    if(temp <= 4) {
      this._outcome.push(EXCERPT.DESPAIR);
    } else if (temp > 4 && temp <= 15) {
      this._outcome.push(EXCERPT.DEVOTION);
    } else if(temp > 15 && temp <= 20) {
      this._outcome.push(EXCERPT.PRAISE);
    } else if(temp > 20 && temp <= 25) {
      this._outcome.push(EXCERPT.DOUBT);
    } else if(temp > 25) {
      this._outcome.push(EXCERPT.TRIAL);
    }
  }

  _calcRegion = (weather) => {
    const { region } = weather;
    const heathens = ['Africa', 'Asia'];
    const gentiles = ['Europe', 'Australia', 'America'];
    if(heathens.includes(region)) {
      this._outcome.push(EXCERPT.HEATHENS);
    } else if(gentiles.includes(region)) {
      this._outcome.push(EXCERPT.GENTILES);
    } 
  }

  _calcCountry = (location) => {
    const { country } = location;
    const trial = ['Sweden', 'Norway', 
      'Netherlands', 'Canada', 'Denmark', 'Finland', 
      'Germany','Australia', 'New Zeeland', 'Iceland'];
    const persec = ['North Korea', 'Somalia', 
      'Yemen','Sudan', 'Eritrea', 'Syria', 
      'Nigeria', 'Pakistan','Libya', 'Iran'];
    if(country === 'Israel') {
      this._outcome.push(EXCERPT.JEWS);
    } else if(trial.includes(country)) {
      this._outcome.push(EXCERPT.TRIAL);
    } else if(persec.includes(country)) {
      this._outcome.push(EXCERPT.PERSECUTION);
    }
  }
}