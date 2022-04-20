import Popup from "./Popup.js";
import {
  cardPopupImageSelector,
  cardPopupCaptionSelector,
  cardPopupSelector,
} from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(imageLink, caption) {
    super(cardPopupSelector);
    this._image = this._element.querySelector(cardPopupImageSelector),
    this._caption = this._element.querySelector(cardPopupCaptionSelector),
    this._captionText = caption,
    this._imageLink = imageLink
  }

  open() {
    this._image.src = this._imageLink;
    this._caption.textContent = this._captionText;
    super.open();
  }
}