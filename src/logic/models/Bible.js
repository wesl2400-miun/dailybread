import { PSALM } from "../data/psalm.js";
import { WISDOM } from "../data/wisdom.js";
import { Scripture } from "./Scripture.js";

/** Modelklassen för bibel-data.
 * @class
 */
export class Bible {

  /** 
   * @param {Scripture} [wisdom=WISDOM] - Lagrar en vers ur Nya Testamentet.
   * @param {Scripture} [psalm=PSALM] - Lagrar avsnitt ur Psalmboken.
   */
  constructor(wisdom, psalm) {
    this.wisdom = wisdom || WISDOM;
    this.psalm = psalm || PSALM;
  }
}