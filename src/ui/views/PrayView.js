import { BibleCard } from "../cards/BibleCard.js";
import { FIELD } from "../../logic/refs/field.js";
import { article, button} from "../utils/element.js";
import { CONTENT } from "../data/content.js";
import { SCREEN } from "../refs/screen.js";

export class PrayView {
  constructor(parent) {
    this._root = article(parent, null);
  }

  _showField = (field, bible) => {
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

  _display = (bible) => {
    this._root.innerHTML = '';
    this._showField(FIELD.WISDOM, bible);
    this._showField(FIELD.PSALM, bible);
  }

  wire = (refresh, bible) => {
    this._display(bible);
    this._backBtn = button(this._root, 
      CONTENT.PRAY_VIEW.BACK_BTN);
    console.log(this._backBtn);
    this._backBtn.addEventListener('click', async () => {
      refresh(SCREEN.LOCATION);
    });
  }
}