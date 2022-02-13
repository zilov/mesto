const editProfileBtn = document.querySelector('.profile__edit-btn');
const popupElement = document.querySelector('.popup');
const popupCloseBtn = popupElement.querySelector('.popup__exit-btn');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const popupInputName = popupElement.querySelector('input[name="profile-name"]');
const popupInputStatus = popupElement.querySelector('input[name="profile-status"]');

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


// function closePopupByBgClick(event) {
//     if (event.target !== event.currentTarget) {
//         return;
//     }
//     closePopup();
// };
// popupElement.addEventListener('click', closePopupByBgClick);


function changeProfileInfo() {
    profileName.textContent = popupInputName.value;
    profileStatus.textContent = popupInputStatus.value;

    closePopup();
};

editProfileBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);
popupElement.querySelector('form[name="form-edit-profile-info"]').addEventListener('submit', changeProfileInfo);