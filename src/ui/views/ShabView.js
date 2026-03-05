import { DEFAULT } from "../../logic/refs/default.js";
import { emptyStr } from "../../logic/utils/emptyStr.js";
import { CONTENT } from "../data/content.js";
import { paragraph } from "../utils/element.js";

export class ShabView {
  constructor(root) {
    this._root = root;
    paragraph(this._root, CONTENT.SHAB_VIEW.DEFAULT);
  }

  refresh = (shabbat) => {
    const { city, start, end, 
      countdown } = shabbat;
    if(emptyStr(city) 
      || emptyStr(start)
      || emptyStr(end)
      || countdown === DEFAULT.COUNTDOWN)
      return;
    this._root.innerHTML = '';
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