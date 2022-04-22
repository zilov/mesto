export const popupActiveClass = "popup_active";
export const popupCloseBtnSelector = ".popup__exit-btn";

export const cardPopupSelector = "#popup-card-image";
export const cardPopupImageSelector = ".popup__image";
export const cardPopupCaptionSelector = '.popup__caption';

export const cardsContainerSelector = ".cards";
export const cardImageSelector = ".card__image";
export const cardTitleSelector = ".card__title";

export const popupAddCardSelector = "#popup-add-card";
export const popupEditProfileSelector = "#popup-edit-profile";

export const formInputSelector = ".form__input";
export const formSelector = ".form";

export const userNameSelector = ".profile__name";
export const userStatusSelector = ".profile__status";

const profileElement = document.querySelector('.profile');
const popupEditElement = document.querySelector('#popup-edit-profile')
export const profileName = profileElement.querySelector(userNameSelector);
export const profileStatus = profileElement.querySelector(userStatusSelector);
export const popupEditNameInput = popupEditElement.querySelector("#nameInput");
export const popupEditStatusInput = popupEditElement.querySelector("#statusInput");

export const profileEditBtn = profileElement.querySelector('.profile__edit-btn');
export const cardAddBtn = profileElement.querySelector('.profile__add-btn');

export const popupAddForm = document.querySelector('#form-add-new-card');
export const popupEditForm = document.querySelector('#form-edit-profile-info');



export const validationSettings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_inactive",
  inputErrorClass: "form__input_invalid",
  errorActiveClass: "form__input-err_visible",
};

export const cardSettings = {
  cardTemplateSelector: "#card-template",
  cardSelector: ".card",
  cardImageSelector: ".card__image",
  cardTitleSelector: ".card__title",
  cardRemoveBtnSelector: ".card__remove-btn",
  cardLikeBtnSelector: ".card__like-btn",
  cardLikeActiveClass: "card__like-btn_type_active",
};

export const cardsListInitial = [
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