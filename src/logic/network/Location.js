import { API } from "../refs/api.js";
import { query } from "../utils/query.js";
import { COUNTRY } from "../refs/country.js";
import { stateInfo } from "../utils/stateInfo.js";
import { CITY } from "../refs/city.js";

export class Location {
  constructor() {
    this.country = localStorage
      .getItem(COUNTRY.NAME) 
      || COUNTRY.DEFAULT;
    this.lat = localStorage
      .getItem(CITY.LATITUDE) 
      || CITY.DEFAULT.LATITUDE;  
    this.lon = localStorage
      .getItem(CITY.LONGITUDE) 
      || CITY.DEFAULT.LONGITUDE;
  }

  update = async(city, error, save = false) => {
    const data = await query(API.location(city));
    const location = data[0] || '';
    if(!this._isValid(city, location, error)) return;
    console.log(location)
    const { display_name, lat, lon } = location;
    this.country = stateInfo(display_name);
    this.lat = lat;
    this.lon = lon;
    if(save) {
      localStorage.setItem(
        COUNTRY.NAME, this.country);
      localStorage.setItem(
        CITY.LATITUDE, this.lat);
      localStorage.setItem(
        CITY.LONGITUDE, this.lon);
    }
  }

  _isValid = (city, location, error) => {
    const name = location?.name || '';
    if(name.toLowerCase() !== city.toLowerCase()) {
      error.update("Location not found." +  
        " Are you sure you spelled it correctly?");
      return false;
    } else { return true; }
  }
}