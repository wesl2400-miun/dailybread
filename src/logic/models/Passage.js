
/** Modellklassen för en bibelvers.
 * @class
 */
export class Passage {
  
  /**
   * @param {string} number - Referensen till versens nummer.
   * @param {string} verse - Bibelversen.
   */
  constructor(number, verse) {
    this.number = number;
    this.verse = verse;
  }
}