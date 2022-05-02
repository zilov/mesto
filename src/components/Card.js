export default class Card {
  constructor(cardData, cardSettings, handleCardClick) {
    this._title = cardData.name,
    this._link = cardData.link,
    this._name = cardData.name,

    this._template = document.querySelector(cardSettings.cardTemplateSelector),
    this._element = this._template.content.querySelector(cardSettings.cardSelector).cloneNode(true),
    this._cardImageElement = this._element.querySelector(cardSettings.cardImageSelector),
    this._cardTitleElement = this._element.querySelector(cardSettings.cardTitleSelector),
    this._removeButton = this._element.querySelector(cardSettings.cardRemoveBtnSelector),
    this._likeButton = this._element.querySelector(cardSettings.cardLikeBtnSelector),
    this._likeActiveClass = cardSettings.cardLikeActiveClass,

    this._handleCardClick = handleCardClick,
    this._removeCard = this._removeCard.bind(this),
    this._toggleLike = this._toggleLike.bind(this)
  }
  
  _toggleLike() {
    this._likeButton.classList.toggle(this._likeActiveClass);
  }

  _removeCard() {
    this._element.remove();
  }  
  
  _addCardListeners() {
    this._removeButton.addEventListener("click", this._removeCard);
    this._likeButton.addEventListener("click", this._toggleLike);
    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
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

