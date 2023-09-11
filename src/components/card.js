import {setCardPopup } from "../index.js";
import { addLike, removeLike } from "./api.js";
import { openPopup } from "./modal.js";

const card = document.getElementById('card').content;
const cardList = document.querySelector('.gallery__cards');
const deletePopup = document.querySelector('.popup_type_delete-card');
const myId = '8e15e35f8605fbee226dfffc';
export let currentCard;
export let currentId;

function createCard(currentElement) {
  const newCard = card.cloneNode(true);
  const cardTitle = currentElement.name;
  const cardUrl = currentElement.link;
  const cardLike = newCard.querySelector('.gallery__like-button');
  const cardDeleteButton = newCard.querySelector('.gallery__delete-button');
  const cardPhoto = newCard.querySelector('.gallery__photo');
  let cardLikes;
  try {
    cardLikes = currentElement.likes.length;
    if (currentElement.likes.some((item) => {
      return item._id === myId})) {
        cardLike.classList.add('gallery__like-button_active')
      }
  }
  catch {
    cardLikes = '0'
  }
  newCard.querySelector('.gallery__like-number').textContent = cardLikes;
  if (currentElement.owner._id !== myId) {
    cardDeleteButton.remove();
  }
  cardPhoto.setAttribute('src', cardUrl);
  cardPhoto.setAttribute('alt', cardTitle);
  newCard.querySelector('.gallery__place').textContent = cardTitle;
  cardLike.addEventListener('click', () => {
    if (cardLike.classList.contains('gallery__like-button_active')) {
      removeLike(currentElement._id)
      .then((res) => {
        cardLike.nextElementSibling.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
    }
    else {
      addLike(currentElement._id)
      .then((res) => {
      cardLike.nextElementSibling.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
    }
    cardLike.classList.toggle('gallery__like-button_active')
  });
  cardDeleteButton.addEventListener('click', (evt) => {
    currentCard = evt.target.closest('.gallery__card');
    currentId = currentElement._id;
    openPopup(deletePopup);
  });
  cardPhoto.addEventListener('click', () => setCardPopup(cardTitle, cardUrl));
  return newCard;
};

function addCard(card) {
  cardList.prepend(card);
};

export {createCard, addCard};
