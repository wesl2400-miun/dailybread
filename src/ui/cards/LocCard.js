import { CONTENT } from "../../logic/data/content.js";
import { DEFAULT } from "../../logic/refs/default.js";
import { checkbox, fieldset, form, paragraph, submitBtn, textfield } from "../utils/element.js";

export class LocCard {
  constructor(parent) {
    this._root = fieldset(parent, 
      CONTENT.LOC_CARD.TITLE, null);
    this._form = form(this._root);
    this._city = textfield(
      this._form, 
      DEFAULT.CITY, 
      CONTENT.LOC_CARD.CITY);
    this._errTag = paragraph(this._form, '');
    this._wireDefCheck(CONTENT.LOC_CARD.DEFAULT);
    this._saveCheck = checkbox(this._form, 
      CONTENT.LOC_CARD.SAVE);
    this._submitBtn = submitBtn(this._form, 
      CONTENT.LOC_CARD.SUBMIT);
  }

  changeCity = (value) => {
    this._city.value = value;
  }

  wire = async (onSubmit) => {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      const city = this._city.value;
      const save = this._saveCheck.checked;
      onSubmit(city, save, this._errTag);
    });
  }

  _wireDefCheck = (label) => {
    const defCheck = checkbox(this._form, label);
    defCheck.addEventListener('change', () => {
      if(defCheck.checked) {
        this._errTag.textContent = '';
        this.changeCity(DEFAULT.CITY);
      }  
      else this._city.value = '';
    });
  }
}