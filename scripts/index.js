import { Card } from "./Card.js";
import { Popup } from "./Popup.js";
import { CardPopup } from "./CardPopup.js";
import { FormValidator } from "./FormValidator.js";

const validationSettings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_inactive",
  inputErrorClass: "form__input_invalid",
  errorActiveClass: "form__input-err_visible",
};

const cardSettings = {
  cardTemplateSelector: "#card-template",
  cardSelector: ".card",
  cardImageSelector: ".card__image",
  cardTitleSelector: ".card__title",
  cardRemoveBtnSelector: ".card__remove-btn",
  cardLikeBtnSelector: ".card__like-btn",
  cardLikeActiveClass: "card__like-btn_type_active",
};

const popupSettings = {
  popupActiveClass: "popup_active",
  popupCloseBtnSelector: ".popup__exit-btn",
}

const pageSettings = {
  popupSelector: ".popup",
  popupEditSelector: "#popup-edit-profile",
  popupAddSelector: "#popup-add-card",
  popupCardSelector: "#popup-card-image",
}

const profileElement = document.querySelector(".profile");
const profileName = profileElement.querySelector(".profile__name");
const profileStatus = profileElement.querySelector(".profile__status");
const profileEditBtn = profileElement.querySelector(".profile__edit-btn");
const cardAddBtn = profileElement.querySelector(".profile__add-btn");

const cardsContainer = document.querySelector(".cards");
const cardPopup = document.querySelector("#popup-card-image");
const cardPopupImage = cardPopup.querySelector(".popup__image");
const cardPopupCaption = cardPopup.querySelector(".popup__caption");

const popupEditElement = document.querySelector("#popup-edit-profile");
const popupEditNameInput = popupEditElement.querySelector("#nameInput");
const popupEditStatusInput = popupEditElement.querySelector("#statusInput");
const popupEditForm = popupEditElement.querySelector("#form-edit-profile-info");

const popupAddElement = document.querySelector("#popup-add-card");
const popupAddTitleInput = popupAddElement.querySelector("#titleInput");
const popupAddImageInput = popupAddElement.querySelector("#imageUrlInput");
const popupAddForm = popupAddElement.querySelector("#form-add-new-card");


const cardsListInitial = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];


const formValidators = {};

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    const formName = form.id;
    const validator = new FormValidator(config, form);
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

const popups = {};

const enablePopupListeners = () => {
  const pagePopups = Array.from(document.querySelectorAll(pageSettings.popupSelector));
  pagePopups.forEach(popup => {
    const popupName = `#${popup.id}`;
    const popupObject = new Popup(popupName, popupSettings);
    popups[popupName] = popupObject;
    popupObject.addPopupCloseListeners();
  })
} 

enablePopupListeners();


function handleCardClick(cardTitle, cardImageLink) {
  cardPopupImage.src = cardImageLink;
  cardPopupImage.alt = cardTitle;
  cardPopupCaption.textContent = cardTitle;
  popups[pageSettings.popupCardSelector].openPopup();
}

function createCard(cardInfo) {
  return new Card(cardInfo, cardSettings, handleCardClick).createCard();
}

function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

function submitNewCard(event) {
  event.preventDefault();

  const cardObj = {
    name: popupAddTitleInput.value,
    link: popupAddImageInput.value,
  };

  const card = createCard(cardObj);
  renderCard(card);
  popups[pageSettings.popupAddSelector].closePopup();
}


function changeProfileInfo(event) {
  event.preventDefault();
  profileName.textContent = popupEditNameInput.value;
  profileStatus.textContent = popupEditStatusInput.value;
  popups[pageSettings.popupEditSelector].closePopup()
}

cardsListInitial.forEach((item) => {
  const card = createCard(item);
  renderCard(card);
});

profileEditBtn.addEventListener("click", function () {
  formValidators[popupAddForm.id].resetValidation();
  popupEditNameInput.value = profileName.textContent;
  popupEditStatusInput.value = profileStatus.textContent;
  popups[pageSettings.popupEditSelector].openPopup();
});

cardAddBtn.addEventListener("click", function () {
  popupAddForm.reset();
  formValidators[popupAddForm.id].resetValidation();
  popups[pageSettings.popupAddSelector].openPopup();
});

popupEditForm.addEventListener("submit", changeProfileInfo);

popupAddForm.addEventListener("submit", submitNewCard);