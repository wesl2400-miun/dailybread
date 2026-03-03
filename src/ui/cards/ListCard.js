import { heading, listItem, list } from "../utils/element.js";

export class ListCard {
  constructor(parent, level, title) {
    heading(parent, level, title);
    this._list = list(parent);
  }

  addItem = (item) => {
    this._list.appendChild(item);
  }
}