import { API } from "../refs/api.js";
import { query } from "../utils/query.js";

export class Weather {
  constructor() {
    this.temp =  20;
    this.code = 0;
    this.region = 'Asia';
  }

  update = async (location) => {
    const { lat, lon } = location;
    const data = await query(API.weather(lat, lon));
    if(data) {
      const { daily, timezone } = data;
      const { temperature_2m_mean, weather_code } = daily;
      const today = weather_code[0];
      this.temp = temperature_2m_mean[0];
      this.code = today;
      this.region = timezone.split('/')[0];
    }
  }
}