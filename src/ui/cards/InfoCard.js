import { heading, paragraph, section } from "../utils/element.js";

/** Kortvy för information.
 * @class
 */
export class InfoCard {

  /** 
   * @param {HTMLElement} parent - Kortet kopplas till detta element.
   */
  constructor(parent) {
    this.root = section(parent);
  }

  
  /**  Skapar ett heading-element.
   * @param {string} level - Ett nummer på rubrik-nivå i strängformatet.
   * @param {string} title - Titel på rubriken.
   */
  addTitle = (level, title) => {
    heading(this.root, level, title);
  }

  
  /**  Skapar ett paragraf-element.
   * @param {string} text - Innehållet för paragrafen.
   */
  addInfo = (text) => {
    paragraph(this.root, text);
  }
}