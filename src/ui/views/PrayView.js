import { BibleCard } from "../cards/BibleCard.js";
import { FIELD } from "../../logic/refs/field.js";
import { article, button, heading } from "../utils/element.js";
import { CONTENT } from "../data/content.js";

export class PrayView {
  constructor(parent, prayer) {
    this._root = article(parent, null);
    this._prayer = prayer;
  }

  _display = (field, bible) => {
    const { chapter, 
      passages } = bible[field];
    const title = field === FIELD.WISDOM
      ? CONTENT.PRAY_VIEW.TITLE1
      : CONTENT.PRAY_VIEW.TITLE2;
    const bibleCard = new BibleCard(this._root);
    bibleCard.addHeading('2', title);
    bibleCard.addHeading('3', chapter);
    bibleCard.addList();
    passages.forEach(passage => {
      bibleCard.addItem(passage);
    });
  }

  display = (cityView, bible) => {
    const backBtn = button(this._root, 
      CONTENT.PRAY_VIEW.BACK_BTN);
    backBtn.addEventListener('click', () => {
      this._root.innerHTML = '';
      cityView.hide(false);
    });
    this._display(FIELD.WISDOM, bible);
    this._display(FIELD.PSALM, bible);
  }
}