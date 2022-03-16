const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_inactive',
  inputErrorClass: 'form__input-err',
  errorClass: 'form__input-err_visible',
  
}

const showErrMessage = (formElement, inputElement, errMessage, errActiveClass) => {
  const errMsgElement = formElement.querySelector(`#${inputElement.id}-Error`);
  errMsgElement.textContent = errMessage;
  errMsgElement.classList.add(errActiveClass);
}


const hideErrMessage = (formElement, inputElement, errActiveClass) => {
  const errMsgElement = formElement.querySelector(`#${inputElement.id}-Error`);
  
  errMsgElement.textContent = '';
  errMsgElement.classList.remove(errActiveClass);
}


const toggleSubmitBtn = (formElement, formInputs, submitBtnSelector, submitBtnDisabledClass) => {
  const submitBtn = formElement.parentElement.querySelector(submitBtnSelector);

  if (!formInputs.every(isInputValid)) {
    submitBtn.classList.add(submitBtnDisabledClass);
    submitBtn.disabled = true;
  } else {
    submitBtn.classList.remove(submitBtnDisabledClass);
    submitBtn.disabled = false;
  }
}

const isInputValid = (inputElement) => {
  return inputElement.validity.valid;
}


const addFormValidityListeners = (formElement, formInputs, errActiveClass, submitBtnSelector, submitBtnDisabledClass) => {
  
  toggleSubmitBtn(formElement, formInputs, submitBtnSelector, submitBtnDisabledClass);
  
  formInputs.forEach(input => {
    input.addEventListener('input', function (event) {
      const valid = event.target.validity.valid;
  
      if (valid) {
        hideErrMessage(formElement, event.target, errActiveClass);
      } else {
        const errMessage = event.target.validationMessage;
        showErrMessage(formElement, event.target, errMessage, errActiveClass);
      }

      toggleSubmitBtn(formElement, formInputs, submitBtnSelector, submitBtnDisabledClass);
    })
  })
}


const enableValidation = (settings) => {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach(formElement => {

    const formInputs = Array.from(formElement.querySelectorAll(settings.inputSelector));
    formElement.addEventListener('submit', function(event) {
      event.preventDefault();
    })


    addFormValidityListeners(formElement, formInputs, settings.errorClass, settings.submitButtonSelector, settings.inactiveButtonClass);
  })
}

enableValidation(validationSettings);