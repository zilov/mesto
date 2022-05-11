import Popup from "./Popup.js";
import {popupRemoveConfirmBtn} from '../utils/constants.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector),
    this._handleConfirm = handleConfirm
    this._confirmButton = this._element.querySelector(popupRemoveConfirmBtn),
    this._confirmButtonDefaultText = this._confirmButton.textContent
  }

  getCard(card) {
    this._card = card;
  }

  loading(turnOn) {
    if (turnOn) {
      this._confirmButton.textContent = "Сохранение..."
    } else {
      this._confirmButton.textContent = this._confirmButtonDefaultText
    }
  }

  setEventListeners() {
    this._confirmButton.addEventListener('click', () => {
      this.loading(true);
      this._card.removeCard()
        .then(() => {
          this.close();
        })
        .catch((err) => {console.log(`Error in Card remove Popup listener: ${err}`);})
        .finally(() => this.loading(false));
    });
    super.setEventListeners();
  }

}