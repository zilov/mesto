const cardSettings = {
  cardSelector: ".card",
  cardImageSelector: ".card__image",
  cardTitleSelector: ".card__title",
  cardRemoveBtnSelector: ".card__remove-btn",
  cardLikeBtnSelector: ".card__like-btn",
  cardLikeActiveClass: "card__like-btn_type_active",
}

export class Card {
  constructor(cardData, cardTemplateSelector, handleCardClick) {
    this._title = cardData.name,
    this._link = cardData.link,
    this._name = cardData.name,
    this._template = document.querySelector(cardTemplateSelector),
    this._element = this._template.content.cloneNode(true),
    this._cardImageElement = this._element.querySelector(cardSettings.cardImageSelector);
    this._cardTitleElement = this._element.querySelector(cardSettings.cardTitleSelector);
    this._handleCardClick = handleCardClick
  }
  
  _toggleLike(event) {
    event.target.classList.toggle(cardSettings.cardLikeActiveClass);
  }

  _removeCard(event) {
    event.target.closest(cardSettings.cardSelector).remove();
  }  
  
  _addCardListeners() {
    this._element
    .querySelector(cardSettings.cardRemoveBtnSelector)
    .addEventListener("click", this._removeCard);
    this._element
    .querySelector(cardSettings.cardLikeBtnSelector)
    .addEventListener("click", this._toggleLike);
    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }
  
  createCard() {
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._title;
    this._cardImageElement.src = this._link;
    
    this._addCardListeners();
  
    return this._element;
  }
}


