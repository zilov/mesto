import {
  popupActiveClass,
  popupCloseBtnSelector,
} from '../utils/constants.js'

export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector),
    this._handleEscClose = this._handleEscClose.bind(this),
    this.close = this.close.bind(this)
  }

  open() {
    this._element.classList.add(popupActiveClass);
    document.addEventListener("keydown", this._handleEscClose);
  }
  
  close() {
    this._element.classList.remove(popupActiveClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }
  
  setEventListeners() {
    this._element
      .querySelector(popupCloseBtnSelector)
      .addEventListener("click", this.close);

    this._element.addEventListener("click", function (event) {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}