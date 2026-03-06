import { emptyStr } from "../utils/utils.js";
import { load, save } from "../utils/utils.js";
import { STORAGE } from "../refs/storage.js";

export class Location {

  constructor(city, country, lat, lon) {
    this.city = city || load(STORAGE.CITY);
    this.country = country|| load(STORAGE.COUNTRY);
    this.lat = lat || load(STORAGE.LATITUDE);
    this.lon = lon || load(STORAGE.LONGITUDE);
  }

  loaded = () => {
    return !emptyStr(this.city) 
      && !emptyStr(this.country)
      && !emptyStr(this.lat)
      && !emptyStr(this.lon);
  }

  remember = () => {
    save(STORAGE.CITY, this.city);
    save(STORAGE.COUNTRY, this.country);
    save(STORAGE.LATITUDE, this.lat);
    save(STORAGE.LONGITUDE, this.lon);
  }
}