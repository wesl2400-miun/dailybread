import { API } from "../../refs/api.js";
import { DEFAULT } from "../../refs/default.js";
import { query } from "../../utils/query.js";

export class Shabbat {
  constructor() {
    this.city = '';
    this.start = '';
    this.end = '';
    this.countdown = DEFAULT.COUNTDOWN;
  }

  update = async (location) => {
    const { city, lat, lon } = location;
    const data = await query(API.shabbat(lat, lon));
    if(data.error) return;
    const { items } = data;
    this.city = city;
    const start = this._times(items, 'candles');
    await this._updCountdown(start.day);
    this.start = `${start.title} ${start.day}`;
    const end = this._times(items, 'havdalah');
    this.end = `${end.title} ${end.day}`;
  }

  _times = (items, category) => {
    const time = items.filter(item => 
      item.category === category)[0];
    const { title, date } = time;
    const day = date.split('T')[0];
    return { title, day }
  }

  _updCountdown = async (day) => {
    const data = await query(API.countdown(day));
    if(data.error) return;
    const { daysonly } = data;
    this.countdown = daysonly;
  }
}