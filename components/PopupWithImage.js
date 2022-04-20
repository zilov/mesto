import Popup from "./Popup.js";
import {
  cardPopupImageSelector,
  cardPopupCaptionSelector,
  cardPopupSelector,
} from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor() {
    super(cardPopupSelector);
    this._image = this._element.querySelector(cardPopupImageSelector),
    this._caption = this._element.querySelector(cardPopupCaptionSelector)
  }

  open(imageLink, caption) {
    this._image.src = imageLink;
    this._caption.textContent = caption;
    super.open();
  }
}