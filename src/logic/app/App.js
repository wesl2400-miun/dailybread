import { SCREEN } from "../../ui/refs/screen.js";
import { VIEW_ID } from "../../ui/refs/view-id.js";
import { element } from "../../ui/utils/element.js";
import { LocView } from "../../ui/views/LocView.js";
import { PrayView } from "../../ui/views/PrayView.js";
import { ShabView } from "../../ui/views/ShabView.js";
import { Bible } from "../models/Bible.js";
import { Shabbat } from "../models/Shabbat.js";

/** Skapar kortyver, tilldelar dem händelser och byter dessa baserat på flaggan 'screen'.
 * @class
 */
export class App {

  /**
  * @param {HTMLElement} root - DOM element som kortvyerna ska kopplas till.
  * @param {HTMLElement} footer - DOM element som kortvyn för shabbat ska kopplas till.
  */
  constructor(root, footer) {
    this._root = root;
    this._footer = footer;
  }

/** Skapar kortvyer, tilldelar dem händelser och ersätter dessa via callbacks.
 * @param {SCREEN} screen - Flaggan som bestämmer vilken kortvy ska visas.
 * @param {Bible} bible - Modelklassen Bible som lagrar information om bibelreferenser.
 * @param {Shabbat} shabbat - Modelklassen som lagrar information om shabbattider.
 */
  refresh = (screen, bible, shabbat) => {
    this._root.innerHTML = '';
    switch(screen) {
      case SCREEN.LOCATION:
        const lView = new LocView(this._root);
        lView.wire(this.refresh);
        break;
      case SCREEN.PRAYER:
        const pView = new PrayView(this._root);
        pView.wire(this.refresh, bible);
        const shabView = new ShabView(this._footer);
        shabView.refresh(shabbat);
        element(VIEW_ID.START).scrollIntoView();
        break;
    }
  }
}