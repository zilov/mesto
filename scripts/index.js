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

const popupList = document.querySelectorAll(".popup");

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

const popupEditInfo = new Popup("#popup-edit-profile");
const popupAddCard = new Popup("#popup-add-card");

popupEditInfo.addPopupCloseListeners();
popupAddCard.addPopupCloseListeners();

function handleCardClick(cardTitle, cardImageLink) {
  cardPopupImage.src = cardImageLink;
  cardPopupImage.alt = cardTitle;
  cardPopupCaption.textContent = cardTitle;
  openPopup(cardPopup);
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
  popupAddCard.closePopup();
}


function changeProfileInfo(event) {
  event.preventDefault();
  profileName.textContent = popupEditNameInput.value;
  profileStatus.textContent = popupEditStatusInput.value;
  popupEditInfo.closePopup();
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_active");
    closePopup(openedPopup);
  }
}

function handleOverlay(popupElement) {
  popupElement.addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
      closePopup(popupElement);
    }
  });
}

cardsListInitial.forEach((item) => {
  const card = createCard(item);
  renderCard(card);
});

profileEditBtn.addEventListener("click", function () {
  formValidators[popupAddForm.id].resetValidation();
  popupEditNameInput.value = profileName.textContent;
  popupEditStatusInput.value = profileStatus.textContent;
  popupEditInfo.openPopup();
});

cardAddBtn.addEventListener("click", function () {
  popupAddForm.reset();
  formValidators[popupAddForm.id].resetValidation();
  popupAddCard.openPopup();
});

popupEditForm.addEventListener("submit", changeProfileInfo);

popupAddForm.addEventListener("submit", submitNewCard);