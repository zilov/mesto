const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: '.form__submit-btn_inactive',
  inputErrorClass: '.form__input-err',
  errorClass: '.form__input-err_visible'
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
  const submitBtn = formElement.parentElement.querySelector('.form__submit-btn');

  if (!formInputs.every(isInputValid)) {
    submitBtn.classList.add('form__submit-btn_inactive');
    submitBtn.disabled = true;
  } else {
    submitBtn.classList.remove('form__submit-btn_inactive');
    submitBtn.disabled = false;
  }
}

const isInputValid = (inputElement) => {
  return inputElement.validity.valid;
}


const addFormValidityListeners = (formElement) => {
  const formInputs = Array.from(formElement.querySelectorAll('.form__input'))
  toggleSubmitBtn(formElement, formInputs);

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

    formElement.addEventListener('submit', function(event) {
      event.preventDefault();
    })
    addFormValidityListeners(formElement);
  })
}

enableValidation(validationSettings);