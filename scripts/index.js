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

const popupEditElement = document.querySelector('#popup-edit-profile');
const popupEditNameInput = popupEditElement.querySelector('#nameInput');
const popupEditStatusInput = popupEditElement.querySelector('#statusInput');
const popupEditSaveBtn = popupEditElement.querySelector('.popup__save-btn');
const popupEditForm = popupEditElement.querySelector('#form-edit-profile-info');

const popupAddElement = document.querySelector('#popup-add-card');
const popupAddTitleInput = popupAddElement.querySelector('#titleInput');
const popupAddImageInput = popupAddElement.querySelector('#imageUrlInput');
const popupAddSaveBtn = popupAddElement.querySelector('.popup__save-btn');
const popupAddForm = popupAddElement.querySelector('#form-add-new-card');

const popupList = document.querySelectorAll('.popup');;

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


function createCard(cardObject) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardImageElement = cardElement.querySelector('.card__image');
    const cardTitleElement = cardElement.querySelector('.card__title');

    cardImageElement.alt = cardObject.name;
    cardTitleElement.textContent = cardObject.name;
    cardImageElement.src = cardObject.link;
    addCardListeners(cardElement);

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
        createCardPopupElement(getCardTitle(cardElement), getCardImageLink(cardElement));
        openPopup(cardPopup);
    });
}


function renderCard(cardElement) {
    cardsContainer.prepend(cardElement);
}


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


function submitNewCard(event) {
    event.preventDefault();
    
    const cardObj = {name: popupAddTitleInput.value, link: popupAddImageInput.value}
    
    renderCard(createCard(cardObj));
    closePopup(popupAddElement);
  };


  function clearAddPopupForm() {
    popupAddForm.reset();
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


function changeProfileInfo(event) {
  event.preventDefault();
  
  profileName.textContent = popupEditNameInput.value;
  profileStatus.textContent = popupEditStatusInput.value;
  
  closePopup(popupEditElement);
};

function setEditPopupInputValues() { 
    popupEditNameInput.value = profileName.textContent; 
    popupEditStatusInput.value = profileStatus.textContent; 
}; 


cardsListInitial.forEach(item => {renderCard(createCard(item))});

popupList.forEach(popup => {addPopupCloseListener(popup)});

profileEditBtn.addEventListener('click', function () {
    setEditPopupInputValues();
    openPopup(popupEditElement);
});

cardAddBtn.addEventListener('click', function () {
    clearAddPopupForm();
    openPopup(popupAddElement);
});

popupEditForm.addEventListener('submit', changeProfileInfo);

popupAddForm.addEventListener('submit', submitNewCard);

