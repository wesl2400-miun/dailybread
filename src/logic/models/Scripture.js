import { Passage } from "./Passage";

/** Modellklassen för ett bibelavsnitt. 
 * @class
 */
export class Scripture {

  /**
   * @param {string} chapter - Namn på ett bibelkapitel
   * @param {Passage[]} passages - Lagrar en lista av bibelverser ur det ovannämnda kapitlet.
   */
  constructor(chapter, passages) {
    this.chapter = chapter;
    this.passages = passages;
  }
}