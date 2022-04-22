export default class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement,
    this._inputSelector = settings.inputSelector,
    this._formInputs = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButtonSelector = settings.submitButtonSelector,
    this._submitBtnElement = this._form.querySelector(this._submitButtonSelector);
    this._inputErrorClass = settings.inputErrorClass,
    this._errorActiveClass = settings.errorActiveClass,
    this._inactiveButtonClass = settings.inactiveButtonClass
  }

  enableValidation() {
    this._form.addEventListener("submit", function (event) {
      event.preventDefault();
    });

    this._addFormValidityListeners();
  };

  resetValidation() {
    this._toggleSubmitBtn();
    this._formInputs.forEach(input => {
      this._hideErrMessage(input);
    })
  }

  _addFormValidityListeners() {
    this._formInputs.forEach((input) => {
      input.addEventListener("input", (event) => {
        const valid = event.target.validity.valid;
  
        if (valid) {
          this._hideErrMessage(event.target);
        } else {
          const errMessage = event.target.validationMessage;
          this._showErrMessage(event.target,errMessage);
        }
        this._toggleSubmitBtn(this._formInputs);
      });
    });
  };

  _showErrMessage(inputElement, errMessage) {
    inputElement.classList.add(this._inputErrorClass);
    const errMsgElement = this._form.querySelector(`#${inputElement.id}-Error`);
    errMsgElement.textContent = errMessage;
    errMsgElement.classList.add(this._errorActiveClass);
  };
  

  _hideErrMessage(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    const errMsgElement = this._form.querySelector(`#${inputElement.id}-Error`);
  
    errMsgElement.textContent = "";
    errMsgElement.classList.remove(this._errorActiveClass);
  };

  
  _isInputValid(inputElement) {
    return inputElement.validity.valid;
  };
  
  _toggleSubmitBtn() {  
    if (!this._formInputs.every(this._isInputValid)) {
      this._submitBtnElement.classList.add(this._inactiveButtonClass);
      this._submitBtnElement.disabled = true;
    } else {
      this._submitBtnElement.classList.remove(this._inactiveButtonClass);
      this._submitBtnElement.disabled = false;
    }
  };
}