import { App } from "../../logic/app/App.js";
import { ShabView } from "./ShabView.js";

export class AppView {
  constructor(root, footer) {
    this._app = new App(root, footer);
    this._root = root;
    this._shabView = new ShabView(footer);
  }

  init = async (screen) => {
    this._app.refresh(screen);
  }
}