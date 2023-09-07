
import './pages/index.css';
import {closePopup, openPopup, overlayClose} from './components/modal.js';
import {createCard, addCard} from './components/card.js';
import {enableValidation, validationSelectors, disableButton} from './components/validate.js';


const initialCards = [
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

const editPopup = document.querySelector('.popup_type_edit-profile');
const addPopup = document.querySelector('.popup_type_add-card');
const photoPopup = document.querySelector('.popup_type_open-card');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');

const editForm = editPopup.querySelector('.popup__form');
const addForm = addPopup.querySelector('.popup__form');

const usernameInput = document.getElementById('username');
const descriptionInput = document.getElementById('description');
const titleInput = document.getElementById('title');
const urlInput = document.getElementById('url');

const username = document.querySelector('.profile__username');
const description = document.querySelector('.profile__description');


const popupPhoto = document.querySelector('.opened-card__photo');
const popupCaption = document.querySelector('.opened-card__caption');



function submitEditForm(event) {
  event.preventDefault();
  username.textContent = usernameInput.value;
  description.textContent = descriptionInput.value;
  closePopup(editPopup);
};

function submitAddForm(event) {
  event.preventDefault();
  const currentObject = {};
  currentObject.name = titleInput.value;
  currentObject.link = urlInput.value;
  const newCard = createCard(currentObject);
  addCard(newCard);
  event.target.reset();
  closePopup(addPopup);
};

function setEditInputsValues() {
  usernameInput.value = username.textContent;
  descriptionInput.value = description.textContent;
};


 export function setCardPopup(cardTitle, cardUrl) {
  popupPhoto.setAttribute('src', cardUrl);
  popupPhoto.setAttribute('alt', cardTitle);
  popupCaption.textContent = cardTitle;
  openPopup(photoPopup);
};


initialCards.forEach(initialElement => {
  const newCard = createCard(initialElement);
  addCard(newCard);
});

editButton.addEventListener('click', () => {
  openPopup(editPopup);
  setEditInputsValues();
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
  disableButton(addPopup.querySelector(validationSelectors.submitButtonSelector));
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  popup.addEventListener('mousedown', (evt) => overlayClose(evt,popup));
  button.addEventListener('click', () => closePopup(popup));
});

editForm.addEventListener('submit', submitEditForm);
addForm.addEventListener('submit', submitAddForm);

enableValidation(validationSelectors);




