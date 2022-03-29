export class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector,
    this._inputSelector = settings.inputSelector,
    this._submitButtonSelector = settings.submitButtonSelector,
    this._inputErrorClass = settings.inputErrorClass,
    this._errorActiveClass = settings.errorActiveClass,
    this._inactiveButtonClass = settings.inactiveButtonClass,
    this._form = formElement
  }

  enableValidation() {
    this._formInputs = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._form.addEventListener("submit", function (event) {
      event.preventDefault();
    });

    this._addFormValidityListeners();
  };

  _addFormValidityListeners() {
    this._formInputs.forEach((input) => {
      input.addEventListener("input", function (event) {
        const valid = event.target.validity.valid;
  
        if (valid) {
          this._hideErrMessage(event.target);
        } else {
          const errMessage = event.target.validationMessage;
          this._showErrMessage(event.target,errMessage);
        }
        this.toggleSubmitBtn(this._formInputs);
      }.bind(this), false);
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
  
  toggleSubmitBtn(formInputs) {
    const submitBtn = this._form.querySelector(this._submitButtonSelector);
  
    if (!formInputs.every(this._isInputValid)) {
      submitBtn.classList.add(this._inactiveButtonClass);
      submitBtn.disabled = true;
    } else {
      submitBtn.classList.remove(this._inactiveButtonClass);
      submitBtn.disabled = false;
    }
  };
}