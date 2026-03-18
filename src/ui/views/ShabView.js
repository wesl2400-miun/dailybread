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
      paragraph(this._root, CONTENT
        .SHAB_VIEW.ERROR);
      return;
    }
    this._root.innerHTML = '';
    let { city, start, 
      end, countdown } = shabbat;
    paragraph(this._root, CONTENT
      .SHAB_VIEW.times(city));
    if(countdown === 0) {
      paragraph(this._root, CONTENT
        .SHAB_VIEW.TODAY);
    } else if(countdown < 0) {
      paragraph(this._root, CONTENT
        .SHAB_VIEW.CURRENT);
    } else {
      paragraph(this._root, CONTENT
        .SHAB_VIEW.daysLeft(countdown));
    }
    if(countdown >= 0) paragraph(
      this._root, start);
    paragraph(this._root, end);
  }
}