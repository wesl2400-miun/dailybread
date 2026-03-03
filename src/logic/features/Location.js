import { API } from "../refs/api.js";
import { query } from "../utils/query.js";
import { COUNTRY } from "../refs/country.js";
import { stateInfo } from "../utils/stateInfo.js";
import { CITY } from "../refs/city.js";

export class Location {
  constructor() {
    this.city = localStorage
      .getItem(CITY.NAME) 
      || CITY.DEFAULT.NAME;
    this.country = localStorage
      .getItem(COUNTRY.NAME) 
      || COUNTRY.DEFAULT;
    this.lat = localStorage
      .getItem(CITY.LATITUDE) 
      || CITY.DEFAULT.LATITUDE;  
    this.lon = localStorage
      .getItem(CITY.LONGITUDE) 
      || CITY.DEFAULT.LONGITUDE;
    this.error = '';
  }

  update = async(city) => {
    const data = await query(API.location(city));
    const location = data[0] || '';
    if(this._invalid(city, location)) return;
    this.error = '';
    const { display_name, lat, lon } = location;
    this.city = city;
    this.country = stateInfo(display_name);
    this.lat = lat;
    this.lon = lon;
  }

  save = (save = false) => {
    if(!save || this.error.length > 0) return;
    localStorage.setItem(
      CITY.NAME, this.city);
    localStorage.setItem(
      COUNTRY.NAME, this.country);
    localStorage.setItem(
      CITY.LATITUDE, this.lat);
    localStorage.setItem(
      CITY.LONGITUDE, this.lon);
  }

  _invalid = (city, location) => {
    const name = location?.name || '';
    if(name.length === 0 
      || name.toLowerCase() !== city.toLowerCase()) {
      this.error = "Location not found." +  
        " Are you sure you spelled it correctly?";
      return true;
    } else { return false; }
  }
}