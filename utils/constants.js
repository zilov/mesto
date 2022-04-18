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

export const popupSettings = {
  popupActiveClass: "popup_active",
  popupCloseBtnSelector: ".popup__exit-btn",
}

export const pageSettings = {
  popupSelector: ".popup",
  popupEditSelector: "#popup-edit-profile",
  popupAddSelector: "#popup-add-card",
  popupCardSelector: "#popup-card-image",
}

export const profileElement = document.querySelector(".profile");
export const profileName = profileElement.querySelector(".profile__name");
export const profileStatus = profileElement.querySelector(".profile__status");
export const profileEditBtn = profileElement.querySelector(".profile__edit-btn");
export const cardAddBtn = profileElement.querySelector(".profile__add-btn");

export const cardsContainer = document.querySelector(".cards");
export const cardPopup = document.querySelector("#popup-card-image");
export const cardPopupImage = cardPopup.querySelector(".popup__image");
export const cardPopupCaption = cardPopup.querySelector(".popup__caption");

export const popupEditElement = document.querySelector("#popup-edit-profile");
export const popupEditNameInput = popupEditElement.querySelector("#nameInput");
export const popupEditStatusInput = popupEditElement.querySelector("#statusInput");
export const popupEditForm = popupEditElement.querySelector("#form-edit-profile-info");

export const popupAddElement = document.querySelector("#popup-add-card");
export const popupAddTitleInput = popupAddElement.querySelector("#titleInput");
export const popupAddImageInput = popupAddElement.querySelector("#imageUrlInput");
export const popupAddForm = popupAddElement.querySelector("#form-add-new-card");


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