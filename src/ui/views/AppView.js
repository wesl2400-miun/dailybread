import { App } from "../../logic/app/App.js";
import { SCREEN } from "../refs/screen.js";
import { ShabView } from "./ShabView.js";

/** Tar hand om alla vyer och logiken bakom dessa.
 * @class
 */
export class AppView {


  /** Tar hand om alla vyer och logiken bakom dessa.
   * @param {HTMLElement} root - Elementet med id:et 'app' som finns inom div-taggen
   * i index.html filen.
   * @param {HTMLElement} footer - Elementet med id:et 'shabbat' som finns inom
   * footer-taggen i index.html filen.
   */
  constructor(root, footer) {
    this._app = new App(root, footer);
    this._root = root;
    this._shabView = new ShabView(footer);
  }

  /** Initierar appen. det vill säga sätter upp vyer och tilldelar de händelser
   * baserat på en screen-flaggan.
   * @param {SCREEN} screen - Bestämmer vilken vy som ska visas.
   */
  init = (screen) => {
    this._app.refresh(screen);
  }
}