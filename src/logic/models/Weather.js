import { DEFAULT } from "../refs/default.js";

/** Modellklassen för väder-data.
 * @class
 */
export class Weather {

  /**
   * @param {number} [temp=DEFAULT.TEMP] - Lagrar data för temperaturen; 
   * förses med hårdkodat värde om ett fel uppstår.
   * @param {number} [code=DEFAULT.WCODE] - Lagrar data för väderkoden; 
   * förses med hårdkodat värde om ett fel uppstår.
   * @param {string} [region=DEFAULT.REGION] - Lagrar data för regionen; 
   * förses med hårdkodat värde om ett fel uppstår.
   */
  constructor(temp, code, region) {
    this.temp = temp || DEFAULT.TEMP;
    this.code = code || DEFAULT.WCODE;
    this.region = region || DEFAULT.REGION;
  }
}