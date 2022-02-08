const editProfileBtn = document.querySelector('.profile__edit-btn');
const editPopupElement = document.querySelector(".edit-popup");
const editPopupCloseBtn = editPopupElement.querySelector('.edit-popup__exit-btn');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const editPopupInputName = editPopupElement.querySelector('.edit-popup__input-name');
const editPopupInputStatus = editPopupElement.querySelector('.edit-popup__input-status');

function setInputValues() {
    console.log(profileName.innerText)
    editPopupInputName.setAttribute('value', profileName.innerText);
    editPopupInputStatus.setAttribute('value', profileStatus.innerText);
};


setInputValues();


function openPopup() {
    editPopupElement.classList.add('edit-popup__active');
}


function closePopup() {
    editPopupElement.classList.remove('edit-popup__active');
}


function closePopupByBgClick(event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup();
};


editProfileBtn.addEventListener('click', openPopup);
console.log(editProfileBtn);
editPopupCloseBtn.addEventListener('click', closePopup);
editPopupElement.addEventListener('click', closePopupByBgClick);


function changeProfileInfo() {
    console.log(profileName, editPopupInputName.value);
    if (editPopupInputName.value !== profileName.innerText) {
        profileName.innerText = editPopupInputName.value;
    };

    if (editPopupInputStatus.value !== profileStatus.innerText) {
        profileStatus.innerText = editPopupInputStatus.value;
    };

    setInputValues();
    return closePopup();
};


const editPopupSaveBtnClick = editPopupElement.querySelector('.edit-popup__save-btn').addEventListener('click', changeProfileInfo);


const likeBtnElements = document.querySelectorAll('.card__like-btn');
console.log(likeBtnElements);

const likeBtnElArray = document.getElementsByClassName('card__like-btn');
console.log(likeBtnElArray);

for (let i = 0; i < likeBtnElArray.length; i++) {
    likeBtnElArray[i].addEventListener('click', function(){
        likeBtnElArray[i].classList.toggle('card__like-btn_active');
    })
}
