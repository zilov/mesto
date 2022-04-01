export class Popup {
  constructor(popupSelector, popupSettings) {
    this._element = document.querySelector(popupSelector),
    this._activeClass = popupSettings.popupActiveClass,
    this._closeBtnSelector = popupSettings.popupCloseBtnSelector
  }

  openPopup() {
    this._element.classList.add(this._activeClass);
    document.addEventListener("keydown", this._escCloseListener.bind(this));
  }
  
  closePopup() {
    this._element.classList.remove(this._activeClass);
    document.removeEventListener("keydown", this._escCloseListener.bind(this));
  }
  
  addPopupCloseListeners() {
    this._element
      .querySelector(this._closeBtnSelector)
      .addEventListener("click", this.closePopup.bind(this));

    this._element.addEventListener("click", function (event) {
      if (event.target === event.currentTarget) {
        this.closePopup();
      }
    }.bind(this));
  }

  _escCloseListener(event) {
    if (event.key === "Escape") {
      this.closePopup();
    }
  }
}