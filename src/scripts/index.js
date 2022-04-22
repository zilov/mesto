import '../pages/index.css'

import Card from "../components/Card.js";
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
  userNameSelector,
  userStatusSelector,
  profileName,
  profileStatus,
  popupEditNameInput,
  popupEditStatusInput,
  profileEditBtn,
  cardAddBtn,
  popupAddForm,
  popupEditForm
} from "../utils/constants.js";


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

const user = new UserInfo(userNameSelector, userStatusSelector);

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, (inputData) => {
  user.setUserInfo(inputData["nameInput"], inputData["statusInput"]);
  popupEditProfile.close();
  }
);

popupEditProfile.setEventListeners();

// cards render

const cards = new Section({
  items: cardsListInitial,
  renderer: (item) => {
    const card = createCard(item);
    cards.addItem(card);
  }}, cardsContainerSelector
)

cards.renderElements();


const cardPopup = new PopupWithImage();
cardPopup.setEventListeners();
function handleCardClick(cardImageLink, cardTitle) {
  cardPopup.open(cardImageLink, cardTitle);
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
  formValidators[popupEditForm.id].resetValidation();
  popupEditNameInput.value = profileName.textContent;
  popupEditStatusInput.value = profileStatus.textContent;
  popupEditProfile.open();
});

cardAddBtn.addEventListener("click", function () {
  formValidators[popupAddForm.id].resetValidation();
  popupNewCard.open();
});