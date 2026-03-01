import { PSALM } from "../data/psalm.js";
import { ADVICE } from "../data/advice.js";
import { PSALMS } from "../data/Psalms.js";
import { Passage } from "../models/Passage.js";
import { Scripture } from "../models/Scripture.js";
import { API } from "../refs/api.js";
import { query } from "../utils/query.js";
import { randOpt } from "../utils/randOpt.js";
import { ADVICES } from "../data/advices.js";

export class Bible {
  constructor() {
    this.advice = ADVICE;
    this.psalm = PSALM;
  }

  update = async (score) => {
    const category = score.category;
    console.log(category)
    const psalmSet = PSALMS.get(category);
    const advSet = ADVICES.get(category);
    const advRef = randOpt(advSet);
    const psalmRef =  'Psalm'+ randOpt(psalmSet);
    await Promise.all([
      query(API.bible(advRef)),
      query(API.bible(psalmRef))
    ]).then(data => {
      const advice = data[0];
      this._update(advice, 'advice');
      const psalm = data[1];
      this._update(psalm, 'psalm');
    })
  }

  _update = (data, field) => {
    if(!data.error) {
      const { reference, verses } = data;
      const content = [];
      verses.forEach(passage => {
        const { verse, text} = passage;
        content.push(new Passage(verse, text));
      });
      this[field] = new Scripture(reference, content);
    } else { console.error(`Bible passage not found.`) }
  }

  reset = () => {
    this.advice = [];
    this.psalm = [];
  }
}