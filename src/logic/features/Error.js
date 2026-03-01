
export class Error {
  constructor() {
    this._message = '';
  }

  update = (message) => {
    this._message = message;
    console.error(this._message);
  }
}