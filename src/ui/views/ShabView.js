import { emptyStr } from "../../logic/utils/utils.js";
import { CONTENT } from "../data/content.js";
import { paragraph } from "../utils/element.js";

/** Vyn för shabbattiderna.
 * @class
 */
export class ShabView {

  /**
   * @param {HTMLElement} - Element som vyn kopplas till.
   */
  constructor(root) {
    this._root = root;
  }

  /** Uppdaterar informationen om shabbattiderna.
   * @param {Shabbat} shabbat - Modellklassen för shabbat.
   */
  refresh = (shabbat) => {
    if(!shabbat) {
      paragraph(this._root, CONTENT.SHAB_VIEW.ERROR);
      return;
    }
    this._root.innerHTML = '';
    let { city, start, 
      end, countdown } = shabbat;
    if(countdown === 0) {
      paragraph(this._root, CONTENT.SHAB_VIEW.TODAY);
    } else if(countdown > 0) {
      paragraph(this._root, CONTENT.SHAB_VIEW.daysLeft(countdown));
    }
    paragraph(this._root, CONTENT.SHAB_VIEW.times(city));
    const startMess = countdown < 0
      ? CONTENT.SHAB_VIEW.CURRENT : start;
    paragraph(this._root, startMess);
    paragraph(this._root, end);
  }
}