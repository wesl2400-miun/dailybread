import { BibleCard } from "../cards/BibleCard.js";
import { FIELD } from "../../logic/refs/field.js";
import { article, button} from "../utils/element.js";
import { CONTENT } from "../data/content.js";
import { SCREEN } from "../refs/screen.js";
import { Bible } from "../../logic/models/Bible.js";
import { Shabbat } from "../../logic/models/Shabbat.js";

/** Vyn för bön och visdomsord.
 * @class
 */
export class PrayView {

  /** 
   * @param {HTMLElement} parent - Element som vyn kopplas till.
   */
  constructor(parent) {
    this._root = article(parent, 'show');
  }

  /** Skapar BibleCard baserad på ett valt fält.
   * @private
   * @param {FIELD} field - Enum-värdet som bestämmer om BibleCard vyn
   * skapas för ett avsnitt från Nya Testamentet eller Psalmboken.
   * @param {Bible} bible - Modellklassen för bibelavsnitt.
   */
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

  /** Visar alla bibelavsnitt baserat på klassmodellen Bible.
   * @private
   * @param {Bible} bible - Modellklassen för bibelavsnitt.
   */
  _display = (bible) => {
    this._root.innerHTML = '';
    this._showField(FIELD.WISDOM, bible);
    this._showField(FIELD.PSALM, bible);
  }

  /** Tilldelar händelsen för 'START OVER'-knappen.
   * När knappen trycks kallas callback-funktionen refresh från App-klassen
   * och en denna vy försvinner och platsvyn visas istället.
  * @param {(screen: SCREEN, bible?: Bible, shabbat?: Shabbat)} refresh - 
   * Callback-funktion som kallas i App-klassen och
   * bestämmer vilken vy som ska visas och vad som ska ske under processen.
   * @param {Bible} bible - Modellklassen för bibel-avsnitt.
   */
  wire = (refresh, bible) => {
    this._display(bible);
    this._backBtn = button(this._root, 
      CONTENT.PRAY_VIEW.BACK_BTN);
    this._backBtn.addEventListener('click', async () => {
      refresh(SCREEN.LOCATION);
    });
  }
}