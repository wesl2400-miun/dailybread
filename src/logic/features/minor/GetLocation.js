import { cityNotFound, getCountry, formatCity } from "../../utils/utils.js";
import { Location } from "../../models/Location.js";
import { query } from "../../utils/utils.js";
import { API } from "../../refs/api.js";

export class GetLocation {
  constructor(userCity) {
    this._userCity = userCity;
  }

  _fromAPI = async () => {
    if(!this._userCity) return null;
    const data = await query(
      API.location(this._userCity));
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
    const result = await this._fromAPI();
    if(!result) return null;
    const fromAPI = this._unpackLoc(result);
    const notFound = cityNotFound(
      this._userCity, fromAPI.city);
    if(notFound) return null;
    return fromAPI;
  }
}