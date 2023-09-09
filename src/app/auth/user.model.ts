export class UserModel {
  constructor(
    public email: string,
    public localId : string,
    private _token : string,
    private _tokenExpirationDate: Date
  ) {};

  get token () {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
