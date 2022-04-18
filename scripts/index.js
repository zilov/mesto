import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  validationSettings,
  cardSettings,
  popupSettings,
  pageSettings,
  cardsListInitial,
  cardsContainerSelector
} from "../utils/constants.js";

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

const cards = new Section({
  items: cardsListInitial,
  renderer: (item) => {
    const card = createCard(item);
    cards.addItem(card);
  }, cardsContainerSelector
})

// // const popups = {};

// // const enablePopupListeners = () => {
// //   const pagePopups = Array.from(document.querySelectorAll(pageSettings.popupSelector));
// //   pagePopups.forEach(popup => {
// //     const popupName = `#${popup.id}`;
// //     const popupObject = new Popup(popupName, popupSettings);
// //     popups[popupName] = popupObject;
// //     popupObject.addPopupCloseListeners();
// //   })
// // } 

// enablePopupListeners();


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