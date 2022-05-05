import '../pages/index.css'

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  validationSettings,
  cardSettings,
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
  popupEditForm,
  apiConfig
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

// api
const mestoApi = new Api(apiConfig);

// render cards from api
const apiCards = mestoApi.getCardsList();


apiCards.then((data) => {return data});

//  render user info on page
const user = new UserInfo(userNameSelector, userStatusSelector);

const profile = mestoApi.getProfileInfo().then((profileInfo) => {return profileInfo});
profile.then((data) => {
  user.setUserInfo(data.name, data.about);
}).catch('Error in setting profile name')

// edit profile info popup

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, (inputData) => {
  user.setUserInfo(inputData["nameInput"], inputData["statusInput"]);
  mestoApi.editProfileInfo(inputData["nameInput"], inputData["statusInput"]);
  popupEditProfile.close();
  }
);

popupEditProfile.setEventListeners();

// cards popup 

const cardPopup = new PopupWithImage();
cardPopup.setEventListeners();
function handleCardClick(cardImageLink, cardTitle) {
  cardPopup.open(cardImageLink, cardTitle);
}

// card element creation

function createCard(cardInfo, myOwn) {
  return new Card(cardInfo, cardSettings, handleCardClick, mestoApi.deleteCard.bind(mestoApi), myOwn).createCard();
}

const renderInitialCards = Promise.all([apiCards, profile]).then(([cardsList, profile]) => {
  const cards = new Section({
    items: cardsList,
    renderer: (item) => {
      if (profile._id !== item.owner._id) {
        const card = createCard(item, false);
        cards.addItem(card, true  );
      } else {
        const card = createCard(item, true);
        cards.addItem(card, true);
      }
  }}, cardsContainerSelector)
  cards.renderElements();
  return [cards, profile];
}).catch((err) => {console.log(`Render initial card ${err}`)})

// add new card popup
renderInitialCards
  .then(([cards, profile]) => {
    console.log(profile._id);
    // new card form popup
    const popupNewCard = new PopupWithForm(popupAddCardSelector, (cardInfo) => {
      // adding card to server
      mestoApi.addNewCard(cardInfo).then((cardData) => {
        // use api card data (with id) to add card to the layout
        const card = createCard(cardData, true);
        cards.addItem(card);
        popupNewCard.close();
      }).catch((err) => {console.log(`Error in new card creation ${err}`);})
    });
    popupNewCard.setEventListeners();
    return popupNewCard
    })
  .then((popupNewCard) => {
    // listen to open card add popup
    cardAddBtn.addEventListener("click", function () {
      formValidators[popupAddForm.id].resetValidation();
      popupNewCard.open();
      })
    })
  .catch((err) => {console.log(err);})


// buttons listeners

profileEditBtn.addEventListener("click", function () {
  formValidators[popupEditForm.id].resetValidation();
  popupEditNameInput.value = profileName.textContent;
  popupEditStatusInput.value = profileStatus.textContent;
  popupEditProfile.open();
});