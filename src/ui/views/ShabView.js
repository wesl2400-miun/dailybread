import { CONTENT } from "../data/content.js";
import { paragraph } from "../utils/element.js";

export class ShabView {
  constructor(root) {
    this._root = root;
  }

  refresh = (shabbat) => {
    if(!shabbat) return;
    this._root.innerHTML = '';
    let { city, start, 
      end, countdown } = shabbat;
    if(countdown === 0) {
      paragraph(this._root, CONTENT.SHAB_VIEW.TODAY);
    } else {
      paragraph(this._root, CONTENT.SHAB_VIEW.daysLeft(countdown));
    }
    paragraph(this._root, CONTENT.SHAB_VIEW.times(city));
    paragraph(this._root, start);
    paragraph(this._root, end)
  }
}