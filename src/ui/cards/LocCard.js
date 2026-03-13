import { CONTENT } from "../data/content.js";
import { DEFAULT } from "../../logic/refs/default.js";
import { checkbox, fieldset, form, paragraph, progbar, submitBtn, textfield } from "../utils/element.js";
import { VIEW_ID } from "../refs/view-id.js";

export class LocCard {
  constructor(parent) {
    const root = fieldset(parent, 
      CONTENT.LOC_CARD.TITLE, null);
    this._form = form(root);
    this._cityField = textfield(
      VIEW_ID.CITY_FIELD,
      this._form, 
      DEFAULT.CITY, 
      CONTENT.LOC_CARD.CITY);
    this._errTag = paragraph(this._form, '', 'error');
    this._saveCheck = checkbox(
      VIEW_ID.SAVE_CHECK, this._form, 
      CONTENT.LOC_CARD.SAVE);
    this._progbar = progbar(this._form);
    submitBtn(this._form, 
      CONTENT.LOC_CARD.SUBMIT);
  }

  fields = () => {
    return {
      form: this._form,
      errTag: this._errTag,
      cityField: this._cityField,
      saveCheck: this._saveCheck,
      progbar: this._progbar
    }
  }
}