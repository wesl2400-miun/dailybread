import { CONTENT } from "../data/content.js";
import { DEFAULT } from "../../logic/refs/default.js";
import { checkbox, fieldset, form, paragraph, submitBtn, textfield } from "../utils/element.js";

export class LocCard {
  constructor(parent) {
    const root = fieldset(parent, 
      CONTENT.LOC_CARD.TITLE, null);
    this._form = form(root);
    this._cityField = textfield(
      this._form, 
      DEFAULT.CITY, 
      CONTENT.LOC_CARD.CITY);
    this._errTag = paragraph(this._form, '');
    this._saveCheck = checkbox(this._form, 
      CONTENT.LOC_CARD.SAVE);
    submitBtn(this._form, 
      CONTENT.LOC_CARD.SUBMIT);
  }

  fields = () => {
    return {
      form: this._form,
      errTag: this._errTag,
      cityField: this._cityField,
      saveCheck: this._saveCheck
    }
  }
}