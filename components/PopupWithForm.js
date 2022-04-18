import Popup from "./Popup";

import { formSelector, formInputSelector } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector)
    this._element = document.querySelector(popupSelector),
    this._form = this._element.querySelector(formSelector),
    this._inputs = Array.from(this._form.querySelectorAll(formInputSelector));
    this._submit = submitCallback
  }

  _getInputValues() {
    this._inputValues = {}
    this._inputs.forEach((input) => {
      this._inputValues[input.id] = input.textContent;
    });
    return this._inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    this._element.addEventListener('submit', this._submit);
    super.setEventListeners();
  }
}