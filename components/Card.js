export default class Card {
  constructor(cardData, cardSettings, handleCardClick) {
    this._title = cardData.name,
    this._link = cardData.link,
    this._name = cardData.name,
    this._template = document.querySelector(cardSettings.cardTemplateSelector),
    this._element = this._template.content.cloneNode(true),
    this._cardImageElement = this._element.querySelector(cardSettings.cardImageSelector),
    this._cardTitleElement = this._element.querySelector(cardSettings.cardTitleSelector),
    this._removeButton = cardSettings.cardRemoveBtnSelector,
    this._likeButton = cardSettings.cardLikeBtnSelector,
    this._likeActive = cardSettings.cardLikeActiveClass,
    this._cardSelector = cardSettings.cardSelector,
    this._handleCardClick = handleCardClick
  }
  
  _toggleLike(event) {
    event.target.classList.toggle(this._likeActive);
  }

  _removeCard(event) {
    event.target.closest(this._cardSelector).remove();
  }  
  
  _addCardListeners() {
    this._element
    .querySelector(this._removeButton)
    .addEventListener("click", this._removeCard.bind(this));
    this._element
    .querySelector(this._likeButton)
    .addEventListener("click", this._toggleLike.bind(this));
    this._cardImageElement.addEventListener('click', () => {
      console.log(this._link, this._name);
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


