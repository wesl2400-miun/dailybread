import { heading, paragraph } from "../utils/element.js";

export class InfoCard {
  constructor(parent) {
    this._parent = parent;
  }

  addTitle = (level, text) => {
    heading(this._parent, level, text);
  }

  addInfo = (text) => {
    paragraph(this._parent, text);
  }
}