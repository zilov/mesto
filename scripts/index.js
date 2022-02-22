const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileStatus = profileElement.querySelector('.profile__status');
const profileEditBtn = profileElement.querySelector('.profile__edit-btn');
const cardAddBtn = profileElement.querySelector('.profile__add-btn');

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const cardPopup = document.querySelector('#popup-card-image');
const cardPopupImage = cardPopup.querySelector('.popup__image');
const cardPopupCaption = cardPopup.querySelector('.popup__caption');

const cardsListInitial = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


function createCard(cardTitle='Тест-лягушонок', cardImageLink='../images/card_test_image.jpg') {
    const cardElement = cardTemplate.cloneNode(true);

    const cardImageElement = cardElement.querySelector('.card__image');
    const cardTitleElement = cardElement.querySelector('.card__title');

    cardImageElement.src = cardImageLink;
    cardImageElement.alt = cardTitle;
    cardTitleElement.textContent = cardTitle;

    return cardElement;
}

function removeCard(event) {
    const cardElement = event.target.closest('.card');
    cardElement.remove()
};

function toggleLike(event) {
  event.target.classList.toggle('card__like-btn_type_active');
}

function addCardListeners(cardElement) {
    cardElement.querySelector('.card__remove-btn').addEventListener('click', removeCard);
    cardElement.querySelector('.card__like-btn').addEventListener('click', toggleLike);
    cardElement.querySelector('.card__image').addEventListener('click', function(event) {
        const card = event.target.closest('.card');
        createCardPopupElement(getCardTitle(card), getCardImageLink(card));
        openPopup(cardPopup);
    });
}

function renderCard(cardElement) {
    addCardListeners(cardElement);
    // cardsContainer.prepend(addCardPopup(cardElement));
    cardsContainer.prepend(cardElement);
}

cardsListInitial.forEach(item => {
    const card = createCard(item.name, item.link);
    renderCard(card);
});

function getCardTitle(cardElement) {
    return cardElement.querySelector('.card__title').textContent;
}

function getCardImageLink(cardElement) {
    return cardElement.querySelector('.card__image').src;
}

function createCardPopupElement(cardTitle, cardImageLink) {
    cardPopupImage.src = cardImageLink;
    cardPopupImage.alt = cardTitle;
    cardPopupCaption.textContent = cardTitle;
}

function openPopup(popupElement) {
    popupElement.classList.add('popup_active');
  }
  
  
function closePopup(popupElement) {
popupElement.classList.remove('popup_active');
}

function addPopupCloseListener(popupElement) {
    popupElement.querySelector('.popup__exit-btn').addEventListener('click', function () {closePopup(popupElement)});
}

addPopupCloseListener(cardPopup);


function addPopup(id, title, submitButtonValue, firstInputPlaceholder, secondInputPlaceholder) {
  const mainElement = document.querySelector('#main');
  const popupTemplate = document.querySelector('#popup-template').content;
  const popupElement = popupTemplate.querySelector('.popup').cloneNode(true);
  const popupTitle = popupElement.querySelector('.popup__title');
  const popupFirstInput = popupElement.querySelector('#firstInput');
  const popupSecondInput = popupElement.querySelector('#secondInput');
  const popupSubmitBtn = popupElement.querySelector('.popup__save-btn');
  const popupCloseBtn = popupElement.querySelector('.popup__exit-btn');

  popupTitle.textContent = title;
  popupFirstInput.placeholder = firstInputPlaceholder;
  popupSecondInput.placeholder = secondInputPlaceholder;
  popupSubmitBtn.value = submitButtonValue;
  
  popupElement.id = id;
  mainElement.appendChild(popupElement);
  popupCloseBtn.addEventListener('click', function () {closePopup(popupElement)});

  return popupElement;
}




function changeProfileInfo(event) {
  event.preventDefault();
  const popupInputName = editPopupElement.querySelector('#firstInput');
  const popupInputStatus = editPopupElement.querySelector('#secondInput');
  
  profileName.textContent = popupInputName.value;
  profileStatus.textContent = popupInputStatus.value;
  
  closePopup(editPopupElement);
};

function submitNewCard(event) {
  event.preventDefault();
  const popupCardTitle = addCardPopupElement.querySelector('#firstInput').value;
  const popupCardFigLink = addCardPopupElement.querySelector('#secondInput').value;
  
  console.log(popupCardFigLink, popupCardTitle);
  addCard(popupCardTitle, popupCardFigLink);
  closePopup(addCardPopupElement);
};



popupEditElement = addPopup('popup-edit', 'Редактировать профиль', 'Сохранить', profileName.textContent, profileStatus.textContent);
const popupEditForm = editPopupElement.querySelector('#form-edit-profile-info');
cardAddPopupElement = addPopup('popup-add', 'Новое место', 'Создать', 'Название', 'Ссылка на картинку');
const cardAddPopupForm = addCardPopupElement.querySelector('#form-edit-profile-info');

profileEditBtn.addEventListener('click', function () {openPopup(popupEditElement)});
addCardBtn.addEventListener('click', function () {openPopup(cardAddPopupElement)});

popupEditForm.addEventListener('submit', changeProfileInfo);
cardAddPopupForm.addEventListener('submit', submitNewCard);

