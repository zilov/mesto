const editProfileBtn = document.querySelector('.profile__edit-btn');
const popupElement = document.querySelector('.popup');
const popupCloseBtn = popupElement.querySelector('.popup__exit-btn');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const popupInputName = popupElement.querySelector('input[name="profile-name"]');
const popupInputStatus = popupElement.querySelector('input[name="profile-status"]');
const popupForm = popupElement.querySelector('form[name="form-edit-profile-info"]');
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


function setInputValues() {
    popupInputName.value = profileName.textContent;
    popupInputStatus.value = profileStatus.textContent;
};


function openPopup() {
    setInputValues();
    popupElement.classList.add('popup_active');
}


function closePopup() {
    popupElement.classList.remove('popup_active');
}


function changeProfileInfo(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileStatus.textContent = popupInputStatus.value;

    closePopup();
};


function addCard(cardTitle='Тест-лягушонок', cardImageLink='../images/card_test_image.jpg') {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardImageLink;
    cardElement.querySelector('.card__title').textContent = cardTitle;
    
    // add remove-btn click listener
    cardElement.querySelector('.card__remove-btn').addEventListener('click', removeCard)

    cardsContainer.append(cardElement);
}

function removeCard(event) {
    const cardElement = event.target.closest('.card');
    cardElement.remove()
};

cardsListInitial.forEach(item => addCard(item.name, item.link));

editProfileBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);
popupForm.addEventListener('submit', changeProfileInfo);