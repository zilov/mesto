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

  getMyUserInfo() {
    const job = 'Get user'
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {this._checkResponse(res, job)})
  }

  editMyUserInfo(){
    const job = 'Edit user info'
    return fetch(`${this._url}/users/me`, {
      method: "PUSH",
      headers: this._headers,
    }).then((res) => {this._checkResponse(res, job)})
  }

  getAllUsers() {
    const job = 'Get user'
    return fetch(`${this._url}/users/`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {this._checkResponse(res, job)})
  }
}