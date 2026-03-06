import { DEFAULT } from "../refs/default.js";

export class Weather {
  constructor(temp, code, region) {
    this.temp = temp || DEFAULT.TEMP;
    this.code = code || DEFAULT.WCODE;
    this.region = region || DEFAULT.REGION;
  }
}