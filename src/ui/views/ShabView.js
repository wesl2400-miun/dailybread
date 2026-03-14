import { emptyStr } from "../../logic/utils/utils.js";
import { CONTENT } from "../data/content.js";
import { paragraph } from "../utils/element.js";

export class ShabView {
  constructor(root) {
    this._root = root;
  }

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
    const mess = emptyStr(countdown) 
      ? CONTENT.SHAB_VIEW.CURRENT : start;
    paragraph(this._root, mess);
    paragraph(this._root, end)
  }
}