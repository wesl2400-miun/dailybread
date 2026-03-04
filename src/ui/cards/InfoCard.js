import { heading, paragraph, section } from "../utils/element.js";

export class InfoCard {
  constructor(parent) {
    this.root = section(parent, null);
  }

  addTitle = (level, text) => {
    heading(this.root, level, text);
  }

  addInfo = (text) => {
    paragraph(this.root, text);
  }
}