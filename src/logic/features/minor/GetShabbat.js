import { Shabbat } from "../../models/Shabbat.js";
import { emptyStr, query } from "../../utils/utils.js";
import { API } from "../../refs/api.js";

export class GetShabbat {
  constructor(location) {
    this._location = location;
  }

  _unpackShab = async (city, result) => {
    const { items } = result;
    const start = this._time(
      items, 'candles');
    const end = this._time(
      items, 'havdalah');
    const countdown = await 
      this._countdown(start.day);
    if(emptyStr(countdown)) return null; 
    return new Shabbat(city,
      `${start.title} ${start.day}`,
      `${end.title} ${end.day}`,
       countdown);
  }

  shabbat = async () => {
    if(!this._location) return null;
    const { city, lat, 
      lon } = this._location;
    const result = await 
      query(API.shabbat(lat, lon));
    if(result.error) return null;
    return await this._unpackShab(
      city, result);
  }

  _time = (items, category) => {
    const time = items.filter(item => 
      item.category === category)[0];
    const { title, date } = time;
    const day = date.split('T')[0];
    return { title, day }
  }

  _countdown = async (day) => {
    const data = await 
      query(API.countdown(day));
    if(data.error) return '';
    return data.daysonly;
  }
}