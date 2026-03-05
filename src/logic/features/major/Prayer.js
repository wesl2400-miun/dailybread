import { FIELD } from "../../../ui/refs/field.js";
import { CONTENT } from "../../data/content.js";

export class Prayer {
  constructor(location, weather, 
    shabbat, bible, score) {
    this._location = location;
    this._weather = weather;
    this._shabbat = shabbat;
    this._bible = bible;
    this._score = score;
  }

  loadCity = (locCard) => {
    const onlyCity = true;
    const city = this._location
      .fromStorage(onlyCity);
    if(!city) return;
    locCard.changeCity(city);
  }

  pickRandom = async (city, save, 
    errTag, prayView, shabView) => {
    await this._location.update(city);
    this._location.save(save);
    const { error } = this._location;
    errTag.textContent = error;
    if(error.length > 0) return;
    await Promise.all([
      this._weather.update(this._location),
      this._shabbat.update(this._location)
    ]);
    this._score.calculate(this._weather, 
      this._location, this._shabbat);
    await this._bible.update(this._score);
    prayView.display();
    shabView.refresh(this._shabbat);
  }

  notify = (field, bibleCard) => {
    const { chapter, 
      passages } = this._bible[field];
    const title = field === FIELD.WISDOM
      ? CONTENT.PRAY_VIEW.TITLE1
      : CONTENT.PRAY_VIEW.TITLE2;
    bibleCard.addHeading('2', title);
    bibleCard.addHeading('3', chapter);
    bibleCard.addList();
    passages.forEach(passage => {
      bibleCard.addItem(passage);
    })
  }
}