import { DEFAULT } from "../../logic/refs/default.js";
import { emptyStr } from "../../logic/utils/emptyStr.js";
import { paragraph } from "../utils/element.js";

export class ShabView {
  constructor(root) {
    this._root = root;
    paragraph(this._root, 'Update your city to view relevant Shabbat times.');
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
      paragraph(this._root, 'Shabbat shalom!');
    } else {
      paragraph(this._root, `${countdown} days until Shabbat`);
    }
    paragraph(this._root, `Times apply to ${city}`);
    paragraph(this._root, start);
    paragraph(this._root, end)
  }
}