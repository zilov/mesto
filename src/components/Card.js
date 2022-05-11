export default class Card {
  constructor(cardData, cardSettings, handleCardClick, handleRemoveClick, api, userInfo) {
    this._cardData = cardData,
    this._title = cardData.name,
    this._link = cardData.link,
    this._name = cardData.name,
    this._likes = cardData.likes,
    this._id = cardData._id,
    this._ownerId = cardData.owner._id,

    this._api = api,
    this._user = userInfo,

    this._template = document.querySelector(cardSettings.cardTemplateSelector),
    this._element = this._template.content.querySelector(cardSettings.cardSelector).cloneNode(true),
    this._cardImageElement = this._element.querySelector(cardSettings.cardImageSelector),
    this._cardTitleElement = this._element.querySelector(cardSettings.cardTitleSelector),
    this._removeButton = this._element.querySelector(cardSettings.cardRemoveBtnSelector),
    this._likeButton = this._element.querySelector(cardSettings.cardLikeBtnSelector),
    this._likeActiveClass = cardSettings.cardLikeActiveClass,

    this._likesCounter = this._element.querySelector(cardSettings.cardLikesCounterSelector),
    this.removeCard = this.removeCard.bind(this),
    this._toggleLike = this._toggleLike.bind(this),

    this._handleCardClick = handleCardClick,
    this._handleRemoveClick = handleRemoveClick
  }
  
  _toggleLike() {
    this._handleLike().then((cardInfo) => {
      this._cardData = cardInfo;
      this._likesCounter.textContent = cardInfo.likes.length;
      this._likeButton.classList.toggle(this._likeActiveClass);
    }).catch((err) => {`Error in toggle like ${err}`})
  }


  _handleLike() {
    if (this._isLiked()) {
      return this._api.deleteCardLike(this._id); 
    } else {
      return this._api.addCardLike(this._id);
    }
  }


  _isLiked() {
    if (this._cardData.likes.some(user => user._id === this._user._id)) {
      return true;
    }
      return false;
  }


  _isMine() {
    if (this._ownerId === this._user._id) {
      return true;
    } else {
      return false;
    }
  }


  removeCard() {
    this._api.deleteCard(this._id)
      .then(() => {this._element.remove()})
      .catch((err) => {console.log(`Error in removing card: ${err}`)});
  }

  
  _addCardListeners() {
    if (this._isMine()) {
      this._removeButton.addEventListener("click", () => {this._handleRemoveClick(this)});
    }
    this._likeButton.addEventListener("click", this._toggleLike);
    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    })
  }

  
  createCard() {
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._title;
    this._cardImageElement.src = this._link;
    this._likesCounter.textContent = this._likes.length;

    if (!this._isMine()) {
      this._removeButton.remove();
    }

    if (this._isLiked(this._cardData)) {
      this._likeButton.classList.toggle(this._likeActiveClass);
    }
    
    this._addCardListeners();
  
    return this._element;
  }
}


