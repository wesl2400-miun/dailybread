import { API } from "../../refs/api.js";
import { query } from "../../utils/query.js";

export class Weather {
  constructor() {
    this.temp =  20;
    this.code = 0;
    this.region = 'Asia';
  }

  update = async (location) => {
    console.log(location);
    const { lat, lon } = location;
    const data = await query(API.weather(lat, lon));
    if(data) {
      const { hourly, timezone } = data;
      const { temperature_2m, weather_code } = hourly;
      const now = weather_code[0];
      this.temp = temperature_2m[0];
      this.code = now;
      this.region = timezone.split('/')[0];
    }
  }
}