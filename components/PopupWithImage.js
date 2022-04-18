import { Popup } from "./Popup.js";

const cardPopupSettings = {
  cardPopupImageSelector: ".popup__image",
  cardPopupCaptionSelector: '.popup__caption',
  cardImageSelector: ".card__image",
  cardTitleSelector: ".card__title",
}

export class CardPopup extends Popup {
  constructor(popupSelector, cardElement) {
    super(popupSelector);
    this._card = cardElement,
    this._image = this._element.querySelector(cardPopupSettings.cardPopupImageSelector),
    this._caption = this._element.querySelector(cardPopupSettings.cardPopupCaptionSelector),
    this._captionText = this._card.querySelector(cardPopupSettings.cardTitleSelector).textContent,
    this._imageLink = this._card.querySelector(cardPopupSettings.cardImageSelector).src
  }
  
  createCardPopupElement() {
    this._image.src = this._imageLink;
    this._image.alt = this._captionText;
    this._caption = this._captionText;
    return this._element;
  }
}