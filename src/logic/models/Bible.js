import { PSALM } from "../data/psalm.js";
import { WISDOM } from "../data/wisdom.js";

export class Bible {
  constructor(wisdom, psalm) {
    this.wisdom = wisdom || WISDOM;
    this.psalm = psalm || PSALM;
  }
}