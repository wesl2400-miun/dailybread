import { Prayer } from "../../logic/features/major/Prayer.js";
import { CityView } from "./CityView.js";
import { PrayView } from "./PrayView.js";
import { ShabView } from "./ShabView.js";


export class AppView {
  constructor(app, footer) {
    this._app = app;
    this._footer = footer;
  }
  
  features = (location, weather, 
    shabbat, bible, score) => {
    this._prayer = new Prayer(location, 
      weather, shabbat, bible, score);
  }

  start = async () => {
    this._shabView = new ShabView(
      this._footer);
    this._cityView = new CityView(
      this._app, this._prayer);
    this._prayView = new PrayView(
      this._app, this._prayer);
    await this._cityView.wire(this._prayView, 
      this._shabView);
  }
}