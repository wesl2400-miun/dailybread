import { API } from "../../refs/api.js";
import { query } from "../../utils/query.js";
import { COUNTRY } from "../../refs/country.js";
import { stateInfo } from "../../utils/stateInfo.js";
import { CITY } from "../../refs/city.js";
import { DEFAULT } from "../../refs/default.js";
import { emptyStr } from "../../utils/emptyStr.js";
import { contEqual } from "../../utils/contEqual.js";

export class Location {
  constructor() {
    const { city, country, lat, lon}  = this.fromStorage();
    console.log('STORAGE: ', city, country, lat, lon);
    this.city = city || DEFAULT.CITY;
    this.country = country || DEFAULT.COUNTRY;
    this.lat = lat || DEFAULT.LATITUDE;  
    this.lon = lon || DEFAULT.LONGITUDE;
    this.error = '';
  }

  fromStorage = (cityOnly = false) => {
    const city = localStorage.getItem(CITY.NAME);
    if(cityOnly) return city;
    return {
      city,
      country: localStorage.getItem(COUNTRY.NAME),
      lat: localStorage.getItem(CITY.LATITUDE),
      lon: localStorage.getItem(CITY.LONGITUDE) 
    }
  }

  _set = (city, country, lat, lon) => {
    this.city = city;
    this.country = country;
    this.lat = lat;
    this.lon = lon;
  }

  update = async(city) => {
    if(city === DEFAULT.CITY) {
      this._set(
        DEFAULT.CITY,
        DEFAULT.COUNTRY, 
        DEFAULT.LATITUDE,
        DEFAULT.LONGITUDE); 
    } else {
      const data = await query(API.location(city));
      const location = data[0] || '';
      if(this._invalid(city, location)) return;
      const { display_name, lat, lon } = location;
      const country = stateInfo(display_name);
      const cityInfo= this._formatCity(city);
      this._set(cityInfo, country, lat, lon);
    }
    this.error = '';
  }

  _formatCity = (city) => {
    const firstChar = city[0].toUpperCase();
    const formatted = firstChar + 
      city.toLowerCase()
        .slice(1, city.length);
    return formatted;
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
    if(emptyStr(name) || !contEqual(name, city)) {
      this.error = "Location not found." +  
        " Are you sure you spelled it correctly?";
      return true;
    } else { return false; }
  }
}