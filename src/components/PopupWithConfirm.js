import Popup from "./Popup.js";
import {popupRemoveConfirmBtn} from '../utils/constants.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector),
    this._handleConfirm = handleConfirm
    this._confirmButton = this._element.querySelector(popupRemoveConfirmBtn)
  }

  getCard(card) {
    console.log(card);
    this._card = card;
  }

  setEventListeners() {
    this._confirmButton.addEventListener('click', () => {
      this._card.removeCard();
      this.close();
    });
    super.setEventListeners();
  }

}