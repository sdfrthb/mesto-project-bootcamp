import { setCardPopup } from "../index.js";

const card = document.getElementById('card').content;
const cardList = document.querySelector('.gallery__cards');

function createCard(currentElement) {
  const newCard = card.cloneNode(true);
  const cardTitle = currentElement.name;
  const cardUrl = currentElement.link;
  const cardLike = newCard.querySelector('.gallery__like-button');
  const cardDeleteButton = newCard.querySelector('.gallery__delete-button');
  const cardPhoto = newCard.querySelector('.gallery__photo');
  cardPhoto.setAttribute('src', cardUrl);
  cardPhoto.setAttribute('alt', cardTitle);
  newCard.querySelector('.gallery__place').textContent = cardTitle;
  cardLike.addEventListener('click', () => cardLike.classList.toggle('gallery__like-button_active'));
  cardDeleteButton.addEventListener('click', () => cardDeleteButton.closest('.gallery__card').remove());
  cardPhoto.addEventListener('click', () => setCardPopup(cardTitle, cardUrl));
  return newCard;
};

function addCard(card) {
  cardList.prepend(card);
};

export {createCard, addCard};
