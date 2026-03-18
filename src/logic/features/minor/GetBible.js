import { Bible } from "../../models/Bible.js";
import { Passage } from "../../models/Passage.js";
import { Scripture } from "../../models/Scripture.js";
import { query } from "../../utils/utils.js";
import { API } from "../../refs/api.js";
import { Score } from "../../models/Score.js";

/** Utför API-anrop till bibel-API:n och lagrar reusltatet i Bible-modellklassen.
 * @class
 */
export class GetBible {

  /**
   * @param {Score} score - Resultatet för beräkning av bibelverser som utförs i CalcScore
   * lagras i Score-objektet som i sin tur innehåller 
   * referenser till en vers från Nya Testamentet (wisRef)
   * och en vers från Psalmboken (psalmRef).
  */
  constructor(score) {
    this._score = score;
  }

  /** Utför parallella API-anrop till bibel-API:n och lagrar resultatet i Bible-modellklassen.
   * @returns {Promise<Bible>} - Asynkron funktion som returnerar Promise-objektet med bibel-data.
  */
  bible = async () => {
    if(!this._score) 
      return new Bible();
    const { wisRef, 
      psalmRef } = this._score;
    const [ wResult, pResult ] = 
      await Promise.all([
        query(API.bible(wisRef)),
        query(API.bible(psalmRef))
      ]);
    const wisdom = this._scripture(wResult);
    const psalm = this._scripture(pResult);
    if(wisdom && psalm) 
      return new Bible(wisdom, psalm);
    else return new Bible();
  }

  /** Bearbetar resultatet från bibel-API:n och returnerar det som
   * ett Scripture-objekt.
   * @private
   * @returns {Scripture | null} - Returnerar ett bibelavsnitt eller null-värdet
   * om API-anropen har misslyckats.
  */
  _scripture = (result) => {
    if(result.error) return null;
    const { reference, verses } = result;
    const passages = [];
    verses.forEach(passage => {
      const { verse, text} = passage;
      const holified = text
        .replaceAll(/Yahweh|Yah/g, 'LORD');
      passages.push(new Passage(
        verse, holified));
    });
    return new Scripture(
      reference, passages);
  }
}