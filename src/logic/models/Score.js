import { DEFAULT } from "../refs/default.js";

/** När de slutgiltiga bibelverserna väljs i CalcScore klassen sparas referenserna i denna klass.
 * @class
 */
export class Score {

  /** 
   * @param {string} [wisRef=DEFAULT.WIS_REF] - Lagrar referensen till en bibelvers från Nya Testamentet,
   * förses med ett hårdkodat värde om något går fel.
   * @param {string} [psalmRef=DEFAULT.PSALM_REF] - Lagrar referensen till en bibelvers från Psalmboken,
   * förses med ett hårdkodat värde om något går fel.
   */
  constructor(wisRef, psalmRef) {
    this.wisRef = wisRef || DEFAULT.WIS_REF;
    this.psalmRef = psalmRef || DEFAULT.PSALM_REF;
  }
}