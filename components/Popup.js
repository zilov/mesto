import {
  popupActiveClass,
  closeBtnSelector,
} from '../utils/constants.js'

export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector)
  }

  open() {
    this._element.classList.add(popupActiveClass);
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }
  
  close() {
    this._element.classList.remove(popupActiveClass);
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }
  
  setEventListeners() {
    this._element
      .querySelector(closeBtnSelector)
      .addEventListener("click", this.close.bind(this));

    this._element.addEventListener("click", function (event) {
      if (event.target === event.currentTarget) {
        this.close();
      }
    }.bind(this));
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}