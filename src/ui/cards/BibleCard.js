import { Passage } from "../../logic/models/Passage.js";
import { heading, listItem, list, span, paragraph, section } from "../utils/element.js";

/** Kortvy för ett bibelavsnitt.
 * @class
 */
export class BibleCard {

  /** 
   * @param {HTMLElement} parent - Kortet kopplas till detta element.
   */
  constructor(parent) {
    this._root = section(parent);
  }

  /**  Skapar ett heading-element.
   * @param {string} level - Ett nummer på rubrik-nivå i strängformatet.
   * @param {string} title - Titel på rubriken.
   */
  addHeading = (level, title) => {
    heading(this._root, level, title);
  }

  /** Skapar en HTML-lista.
   */
  addList = () => {
    this._list = list(this._root);
  }

  /** Skapar ett element i HTML-listan baserat på ett bibelavsnitt.
   * @param {Passage} passage - Bibelavsnitt.
   */
  addItem = (passage) => {
    const { number, verse } = passage;
    const item = listItem(this._list);
    span(item, number);
    paragraph(item, verse);
  }
}