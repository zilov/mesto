const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'form__input-err',
  errorClass: 'form__input-err_visible'
}

const showErrMessage = (formElement, inputElement, errMessage) => {
  const errMsgElement = formElement.querySelector(`#${inputElement.id}-Error`);
  errMsgElement.textContent = errMessage;
  errMsgElement.classList.add('form__input-err_visible');
}


const hideErrMessage = (formElement, inputElement) => {
  const errMsgElement = formElement.querySelector(`#${inputElement.id}-Error`);
  
  errMsgElement.textContent = '';
  errMsgElement.classList.remove('form__input-err_visible');
}


const toggleSubmitBtn = (formElement, formInputs) => {
  const submitBtn = formElement.parentElement.querySelector('.popup__save-btn');

  if (!formInputs.every(isInputValid)) {
    submitBtn.classList.add('popup__save-btn_inactive');
  } else {
    submitBtn.classList.remove('popup__save-btn_inactive');
  }
}

const isInputValid = (inputElement) => {
  return inputElement.validity.valid;
}


const addFormValidityListeners = (formElement) => {
  const formInputs = Array.from(formElement.querySelectorAll('.form__input'))

  formInputs.forEach(input => {
    input.addEventListener('input', function (event) {
      const valid = event.target.validity.valid;
  
      if (valid) {
        hideErrMessage(formElement, event.target);
      } else {
        const errMessage = event.target.validationMessage;
        showErrMessage(formElement, event.target, errMessage);
      }

      toggleSubmitBtn(formElement, formInputs);
    })
  })
}


const enableValidation = (settings) => {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach(formElement => {
    addFormValidityListeners(formElement);
  })
}

enableValidation(validationSettings);