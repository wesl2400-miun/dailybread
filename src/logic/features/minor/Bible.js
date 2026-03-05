import { PSALM } from "../../data/psalm.js";
import { WISDOM } from "../../data/wisdom.js";
import { PSALMS } from "../../data/Psalms.js";
import { Passage } from "../../models/Passage.js";
import { Scripture } from "../../models/Scripture.js";
import { API } from "../../refs/api.js";
import { query } from "../../utils/query.js";
import { randOpt } from "../../utils/randOpt.js";
import { FIELD } from "../../refs/field.js";
import { WISDOMS } from "../../data/wisdoms.js";

export class Bible {
  constructor() {
    this.wisdom = WISDOM;
    this.psalm = PSALM;
  }

  update = async (score) => {
    const category = score.category;
    const psalmSet = PSALMS.get(category);
    const wisSet = WISDOMS.get(category);
    const wisRef = randOpt(wisSet);
    const psalmRef = 'Psalm' + randOpt(psalmSet);
    const [ wisdom, psalm] = await Promise.all([
      query(API.bible(wisRef)),
      query(API.bible(psalmRef))
    ]);
    this._update(wisdom, FIELD.WISDOM);
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