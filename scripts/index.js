import { Card } from "./Card.js";
import { Popup } from "./Popup.js";
import { CardPopup } from "./CardPopup.js";

const profileElement = document.querySelector(".profile");
const profileName = profileElement.querySelector(".profile__name");
const profileStatus = profileElement.querySelector(".profile__status");
const profileEditBtn = profileElement.querySelector(".profile__edit-btn");
const cardAddBtn = profileElement.querySelector(".profile__add-btn");

const cardsContainer = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content;
const cardPopup = document.querySelector("#popup-card-image");
const cardPopupImage = cardPopup.querySelector(".popup__image");
const cardPopupCaption = cardPopup.querySelector(".popup__caption");

const popupEditElement = document.querySelector("#popup-edit-profile");
const popupEditNameInput = popupEditElement.querySelector("#nameInput");
const popupEditStatusInput = popupEditElement.querySelector("#statusInput");
const popupEditSaveBtn = popupEditElement.querySelector(".form__submit-btn");
const popupEditForm = popupEditElement.querySelector("#form-edit-profile-info");

const popupAddElement = document.querySelector("#popup-add-card");
const popupAddTitleInput = popupAddElement.querySelector("#titleInput");
const popupAddImageInput = popupAddElement.querySelector("#imageUrlInput");
const popupAddSaveBtn = popupAddElement.querySelector(".form__submit-btn");
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


function renderCardPopup(event) {
  const card = event.target.closest(".card");
  const cardPopup = new CardPopup("#popup-card-image", card);
  cardPopup.openPopup();
}

function addCardListeners(cardElement) {
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", renderCardPopup);
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

  renderCard(new Card(cardObj, "#card-template").createCard());
  popupAddCard.closePopup();
}

function changeProfileInfo(event) {
  event.preventDefault();
  profileName.textContent = popupEditNameInput.value;
  profileStatus.textContent = popupEditStatusInput.value;
  popupEditInfo.closePopup();
}


function hideInputErrors(popupElement) {
  const formElement = popupElement.querySelector(".form");
  const popupInputs = Array.from(popupElement.querySelectorAll(".form__input"));

  popupInputs.forEach((inputElement) => {
    inputElement.classList.remove("form__input_invalid");
    const errMsgElement = formElement.querySelector(
      `#${inputElement.id}-Error`
    );

    errMsgElement.textContent = "";
    errMsgElement.classList.remove("form__input-err_visible");
  });
}

function disableSubmitBtn(popupElement) {
  const submitBtn = popupElement.querySelector(".form__submit-btn");
  submitBtn.classList.add("form__submit-btn_inactive");
  submitBtn.disabled = true;
}

cardsListInitial.forEach((item) => {
  const card = new Card(item, "#card-template").createCard();
  addCardListeners(card);
  renderCard(card);
});

profileEditBtn.addEventListener("click", function () {
  popupEditNameInput.value = profileName.textContent;
  popupEditStatusInput.value = profileStatus.textContent;
  hideInputErrors(popupEditElement);
  disableSubmitBtn(popupEditElement);

  popupEditInfo.openPopup();
});

cardAddBtn.addEventListener("click", function () {
  popupAddForm.reset();
  hideInputErrors(popupAddElement);
  disableSubmitBtn(popupAddElement);
  popupAddCard.openPopup();
});

popupEditForm.addEventListener("submit", changeProfileInfo);

popupAddForm.addEventListener("submit", submitNewCard);