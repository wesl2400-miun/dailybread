import { DEFAULT } from "../refs/default.js";

export class Score {
  constructor(wisRef, psalmRef) {
    this.wisRef = wisRef || DEFAULT.WIS_REF;
    this.psalmRef = psalmRef || DEFAULT.PSALM_REF;
  }
}