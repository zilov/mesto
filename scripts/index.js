const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileStatus = profileElement.querySelector('.profile__status');
const editProfileBtn = profileElement.querySelector('.profile__edit-btn');
const addCardBtn = profileElement.querySelector('.profile__add-btn');
const cardsContainer = document.querySelector('.cards');
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


function addCard(cardTitle='Тест-лягушонок', cardImageLink='../images/card_test_image.jpg') {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardImageLink;
    cardElement.querySelector('.card__title').textContent = cardTitle;
    
    // add remove-btn click listener
    cardElement.querySelector('.card__remove-btn').addEventListener('click', removeCard);
    cardElement.querySelector('.card__like-btn').addEventListener('click', toggleLike)

    cardsContainer.prepend(cardElement);

}

function removeCard(event) {
    const cardElement = event.target.closest('.card');
    cardElement.remove()
};

function toggleLike(event) {
  event.target.classList.toggle('card__like-btn_type_active');
}

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

function openPopup(popupElement) {
  popupElement.classList.add('popup_active');
}


function closePopup(popupElement) {
  popupElement.classList.remove('popup_active');
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

cardsListInitial.forEach(item => addCard(item.name, item.link));

editPopupElement = addPopup('popup-edit', 'Редактировать профиль', 'Сохранить', profileName.textContent, profileStatus.textContent);
const editPopupForm = editPopupElement.querySelector('#form-edit-profile-info');
addCardPopupElement = addPopup('popup-add', 'Новое место', 'Создать', 'Название', 'Ссылка на картинку');
addCardPopupElement.type = 'url';
const addCardPopupForm = addCardPopupElement.querySelector('#form-edit-profile-info');

editProfileBtn.addEventListener('click', function () {openPopup(editPopupElement)});
addCardBtn.addEventListener('click', function () {openPopup(addCardPopupElement)});

editPopupForm.addEventListener('submit', changeProfileInfo);
addCardPopupForm.addEventListener('submit', submitNewCard);