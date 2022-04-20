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
  cardsContainerSelector,
  popupAddCardSelector,
  popupEditProfileSelector,
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



// validation
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


const popupEditProfile = new PopupWithForm(popupEditProfileSelector, 
  function changeProfileInfo(event) {
    event.preventDefault();
    profileName.textContent = popupEditNameInput.value;
    profileStatus.textContent = popupEditStatusInput.value;
    popups[pageSettings.popupEditSelector].closePopup()
  }
  );
  

// cards render

const cards = new Section({
  items: cardsListInitial,
  renderer: (item) => {
    const card = createCard(item);
    cards.addItem(card);
  }}, cardsContainerSelector
)

cards.renderElements();


function handleCardClick(cardImageLink, cardTitle) {
  const cardPopup = new PopupWithImage(cardImageLink, cardTitle);
  cardPopup.setEventListeners();
  cardPopup.open();
}

function createCard(cardInfo) {
  return new Card(cardInfo, cardSettings, handleCardClick).createCard();
}

const popupNewCard = new PopupWithForm(popupAddCardSelector, (cardInfo) => {
  const card = createCard(cardInfo);
  cards.addItem(card);
  popupNewCard.close();
});

popupNewCard.setEventListeners();


// buttons listeners

profileEditBtn.addEventListener("click", function () {
  formValidators[popupAddForm.id].resetValidation();
  popupEditNameInput.value = profileName.textContent;
  popupEditStatusInput.value = profileStatus.textContent;
  popups[pageSettings.popupEditSelector].openPopup();
});

cardAddBtn.addEventListener("click", function () {
  formValidators[popupAddForm.id].resetValidation();
  popupNewCard.open();
});