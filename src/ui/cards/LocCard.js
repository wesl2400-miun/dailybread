import { checkbox, form, label, paragraph, submitBtn, textfield } from "../utils/element.js";

export class LocCard {
  constructor(parent) {
    this._form = form(parent);
    label(this._form, 'My City');
    this._textfield = textfield(this._form, 'Jerusalem');
    this._errMess = paragraph(this._form, '');
    this._checkbox = checkbox(this._form);
    label(this._form, 'Save My Location');
    this._submitBtn = submitBtn(this._form, 'Pick My Prayer');
  }

  wire = (onSubmit) => {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      const loc = this._textfield.value;
      const save = this._checkbox.checked;
      onSubmit(loc, save, this._errMess);
    });
  }
}