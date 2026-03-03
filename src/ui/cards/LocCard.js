import { CITY } from "../../logic/refs/city.js";
import { checkbox, form, label, paragraph, submitBtn, textfield } from "../utils/element.js";

export class LocCard {
  constructor(parent) {
    this._form = form(parent);
    label(this._form, 'My City');
    this._city = textfield(this._form, 
      CITY.DEFAULT.NAME);
    this._errMess = paragraph(this._form, '');
    const defCheck = checkbox(this._form);
    this._wireDefCheck(defCheck);
    label(this._form, 'Use default location');
    this._saveCheck = checkbox(this._form);
    label(this._form, 'Save My Location');
    this._submitBtn = submitBtn(this._form, 'Pick My Prayer');
  }

  wire = async (onSubmit) => {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      const city = this._city.value;
      const save = this._saveCheck.checked;

      onSubmit(city, save, this._errMess);
    });
  }

  _wireDefCheck = (defCheck) => {
    defCheck.addEventListener('change', () => {
      if(defCheck.checked) {
        this._errMess.textContent = '';
        this._city.value = CITY.DEFAULT.NAME;
      }  
      else this._city.value = '';
    });
  }
}