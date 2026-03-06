import { Bible } from "../models/Bible.js";
import { Passage } from "../models/Passage.js";
import { Scripture } from "../models/Scripture.js";
import { query } from "../utils/utils.js";
import { API } from "../refs/api.js";

export class GetBible {
  constructor(score) {
    this._score = score;
  }

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

  _scripture = (result) => {
    if(result.error) return null;
    const { reference, verses } = result;
    const passages = [];
    verses.forEach(passage => {
      const { verse, text} = passage;
      passages.push(new Passage(
        verse, text));
    });
    return new Scripture(
      reference, passages);
  }
}