import Popup from "./Popup.js";

import { formSelector, formInputSelector, popupSubmitBtnSelector } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector)
    this._element = document.querySelector(popupSelector),
    this._form = this._element.querySelector(formSelector),
    this._inputs = Array.from(this._form.querySelectorAll(formInputSelector)),
    this._submitBtn = this._element.querySelector(popupSubmitBtnSelector),
    this._submitBtnDefaultText = this._submitBtn.textContent,
    this._submit = submitCallback
  }

  _getInputValues() {
    this._inputValues = {}
    this._inputs.forEach((input) => {
      this._inputValues[input.id] = input.value;
    });
    return this._inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  loading(turnOn) {
    if (turnOn) {
      this._submitBtn.textContent = "Сохранение..."
    } else {
      this._submitBtn.textContent = this._submitBtnDefaultText
    }
  }

  setEventListeners() {
    this._element.addEventListener('submit', () => {
      const item = this._getInputValues(); 
      this.loading(true);
      this._submit(item);
    });
    super.setEventListeners();
  }
}