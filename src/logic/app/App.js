import { SCREEN } from "../../ui/refs/screen.js";
import { VIEW_ID } from "../../ui/refs/view-id.js";
import { element } from "../../ui/utils/element.js";
import { LocView } from "../../ui/views/LocView.js";
import { PrayView } from "../../ui/views/PrayView.js";
import { ShabView } from "../../ui/views/ShabView.js";

export class App {
  constructor(root, footer) {
    this._root = root;
    this._footer = footer;
    this._views = new Map();
  }

  addView = (screen, view) => {
    this._views.set(screen, view);
  }

  refresh = async (screen, bible, shabbat) => {
    this._root.innerHTML = '';
    switch(screen) {
      case SCREEN.LOCATION:
        const lView = new LocView(this._root);
        await lView.wire(this.refresh);
        break;
      case SCREEN.PRAYER:
        const pView = new PrayView(this._root);
        pView.wire(this.refresh, bible);
        const shabView = new ShabView(this._footer);
        shabView.refresh(shabbat);
        element(VIEW_ID.APP).scrollIntoView();
        break;
    }
  }
}