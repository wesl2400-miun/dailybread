
export class UserReq {
  constructor(userCity, saveLoc = false) {
    this.userCity = userCity;
    this.saveLoc = saveLoc;
  }
}