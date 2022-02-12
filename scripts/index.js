const editProfileBtn = document.querySelector('.profile__edit-btn');
const popupElement = document.querySelector(".popup");
const popupCloseBtn = popupElement.querySelector('.popup__exit-btn');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const popupInputName = popupElement.querySelector('.popup__input-name');
const popupInputStatus = popupElement.querySelector('.popup__input-status');

function setInputValues() {
    console.log(profileName.innerText)
    popupInputName.setAttribute('value', profileName.innerText);
    popupInputStatus.setAttribute('value', profileStatus.innerText);
};


setInputValues();


function openPopup() {
    popupElement.classList.add('popup__active');
}


function closePopup() {
    popupElement.classList.remove('popup__active');
}


function closePopupByBgClick(event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup();
};


editProfileBtn.addEventListener('click', openPopup);
console.log(editProfileBtn);
popupCloseBtn.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByBgClick);


function changeProfileInfo() {
    console.log(profileName, popupInputName.value);
    if (popupInputName.value !== profileName.innerText) {
        profileName.innerText = popupInputName.value;
    };

    if (popupInputStatus.value !== profileStatus.innerText) {
        profileStatus.innerText = popupInputStatus.value;
    };

    setInputValues();
    return closePopup();
};


const popupSaveBtnClick = popupElement.querySelector('.popup__save-btn').addEventListener('click', changeProfileInfo);

const likeBtnElArray = document.getElementsByClassName('card__like-btn');
console.log(likeBtnElArray);

for (let i = 0; i < likeBtnElArray.length; i++) {
    likeBtnElArray[i].addEventListener('click', function(){
        likeBtnElArray[i].classList.toggle('card__like-btn_active');
    })
}
