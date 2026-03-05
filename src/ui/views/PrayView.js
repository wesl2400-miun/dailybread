import { BibleCard } from "../cards/BibleCard.js";
import { FIELD } from "../refs/field.js";
import { article, heading } from "../utils/element.js";

export class PrayView {
  constructor(parent, prayer) {
    this._root = article(parent, null);
    this._prayer = prayer;
  }

  display = () => {
    this._root.innerHTML = '';
    this._prayer.notify(FIELD.WISDOM,
      new BibleCard(this._root));
    this._prayer.notify(FIELD.PSALM, 
      new BibleCard(this._root));
  }
}