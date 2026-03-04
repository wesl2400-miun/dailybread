import { PSALM } from "../../data/psalm.js";
import { ADVICE } from "../../data/advice.js";
import { PSALMS } from "../../data/Psalms.js";
import { Passage } from "../../models/Passage.js";
import { Scripture } from "../../models/Scripture.js";
import { API } from "../../refs/api.js";
import { query } from "../../utils/query.js";
import { randOpt } from "../../utils/randOpt.js";
import { ADVICES } from "../../data/advices.js";
import { FIELD } from "../../../ui/refs/field.js";

export class Bible {
  constructor() {
    this.advice = ADVICE;
    this.psalm = PSALM;
  }

  update = async (score) => {
    const category = score.category;
    const psalmSet = PSALMS.get(category);
    const advSet = ADVICES.get(category);
    const advRef = randOpt(advSet);
    const psalmRef = 'Psalm' + randOpt(psalmSet);
    const [ advice, psalm] = await Promise.all([
      query(API.bible(advRef)),
      query(API.bible(psalmRef))
    ]);
    this._update(advice, FIELD.ADVICE);
    this._update(psalm, FIELD.PSALM);
  }

  _update = (data, field) => {
    if(!data.error) {
      const { reference, verses } = data;
      const passages = [];
      verses.forEach(passage => {
        const { verse, text} = passage;
        const holified = text.replace('Yahweh', 'LORD');
        passages.push(new Passage(verse, holified));
      });
      this[field] = new Scripture(reference, passages);
    } else { console.error(`Bible passage not found.`) }
  }
}