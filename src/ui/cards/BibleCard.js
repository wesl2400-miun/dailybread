import { heading, listItem, list, span, paragraph, section } from "../utils/element.js";

export class BibleCard {
  constructor(parent) {
    this._root = section(parent, null);
  }

  addHeading = (level, title) => {
    heading(this._root, level, title);
  }

  addList = () => {
    this._list = list(this._root);
  }

  addItem = (passage) => {
    const { number, verse } = passage;
    const item = listItem(this._list);
    span(item, number);
    paragraph(item, verse);
  }
}