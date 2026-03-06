import { cityNotFound, getCountry, formatCity } from "../utils/utils.js";
import { Location } from "../models/Location.js";
import { query } from "../utils/utils.js";
import { API } from "../refs/api.js";

export class PickCity {
  constructor(userReq) {
    this._userReq = userReq;
  }

  _fromAPI = async () => {
    const { userCity } = this._userReq;
    if(!userCity) return null;
    const data = await query(
      API.location(userCity));
    return data[0] || null;
  }

  _unpackLoc = (result) => {
    const { display_name, 
      lat, lon } = result;
    const cityInfo = display_name
      .split(', ')[0] || '';
    const city = formatCity(cityInfo);
    const country = getCountry(display_name);
    return new Location(city, 
      country, lat, lon);
  }

  location = async () => {
    const location = new Location();
    if(location.loaded()) return location;
    const { userCity, saveLoc } = this._userReq;
    const result = await this._fromAPI();
    if(!result) return null;
    const fromAPI = this._unpackLoc(result);
    const notFound = cityNotFound(
      userCity, fromAPI.city);
    if(notFound) return null;
    if(saveLoc) fromAPI.remember();
    return fromAPI;
  }
}