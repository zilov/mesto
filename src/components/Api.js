export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res, job) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка в ${job}`)
  }

  getCardsList() {
    const job = 'Get card list'
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {return this._checkResponse(res, job)})
  }

  getProfileInfo() {
    const job = 'Get user info'
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {return this._checkResponse(res, job)})
  }

  editProfileInfo(newName, newAbout){
    const job = 'Edit user info'
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    }).then((res) => {return this._checkResponse(res, job)})
  }

  addNewCard(cardName, imgLink) {
    const job = 'Edit user info'
    return fetch(`${this._url}/users/me`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        about: imgLink
      })
    }).then((res) => {return this._checkResponse(res, job)})
  }
}