import { query } from "../../utils/utils.js";
import { API } from "../../refs/api.js";
import { Weather } from "../../models/Weather.js";

export class GetWeather {
  constructor(location) {
    this._location = location;
  }

  _unpackWeath = (result) => {
    const { daily, timezone } = result;
    console.log(result)
    const { temperature_2m_mean, 
      weather_code } = daily;
    const now = weather_code[0];
    const temp = temperature_2m_mean[0];
    const code = now;
    const region = timezone
      .split('/')[0];
    return new Weather(
      temp, code, region);
  }

  weather = async () => {
    if(!this._location) 
      return new Weather();
    const { lat, 
      lon } = this._location;
    const result = await query(
      API.weather(lat, lon));
    if(result.error) 
      return new Weather();
    return this._unpackWeath(result);
  }
}