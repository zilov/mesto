const popupSettings = {
  popupActiveSelector: '.popup_active',
  popupActiveClass: "popup_active",
  popupCloseBtnSelector: ".popup__exit-btn",
}

export class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
  }

  openPopup() {
    this._element.classList.add(popupSettings.popupActiveClass);
    document.addEventListener("keydown", this._escCloseListener);
  }
  
  closePopup() {
    this._element.classList.remove(popupSettings.popupActiveClass);
    document.removeEventListener("keydown", this._escCloseListener);
  }
  
  addPopupCloseListeners() {
    this._element
      .querySelector(popupSettings.popupCloseBtnSelector)
      .addEventListener("click", function () {
        this.closePopup();
      });

    this._element.addEventListener("click", function (event) {
      if (event.target === event.currentTarget) {
        this.closePopup();
      }
    });
  }

  _escCloseListener(event) {
    if (event.key === "Escape") {
      this.closePopup();
    }
  }
}