import './pages/index.css';
import {closePopup, openPopup, handleOverlay} from './components/modal.js';
import {createCard, addCard, currentId, currentCard} from './components/card.js';
import {enableValidation, validationSelectors} from './components/validate.js';
import {getUserData, getInitialCards, editProfile, addNewCard, editAvatar, deleteCard} from './components/api';
import {renderLoading, handleSubmit} from './components/utils';


const editPopup = document.querySelector('.popup_type_edit-profile');
const addPopup = document.querySelector('.popup_type_add-card');
export const cardPopup = document.querySelector('.popup_type_open-card');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
export const deletePopup = document.querySelector('.popup_type_delete-card');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar')
const closeButtons = document.querySelectorAll('.popup__close-button');

const editForm = document.forms['profile-form'];
const addForm = document.forms['add-card-form'];
const avatarForm = document.forms['edit-avatar-form'];
const deleteForm = document.forms['delete-card-form'];

const usernameInput = document.getElementById('username');
const descriptionInput = document.getElementById('description');
const titleInput = document.getElementById('title');
const urlInput = document.getElementById('url');
const photoInput = document.getElementById('photo')

const username = document.querySelector('.profile__username');
const description = document.querySelector('.profile__description');
const avatar = document.querySelector('.profile__avatar')

export let userId


function submitEditForm(evt) {
  function makeRequest() {
    return editProfile({
      username: usernameInput.value,
      description: descriptionInput.value
    })
  .then((res) => {
    username.textContent = res.name;
    description.textContent = res.about;
    })
  }
  handleSubmit(makeRequest, evt, true)
};

function submitAvatarForm(evt) {
  function makeRequest() {
   return editAvatar({
    photo: photoInput.value
    })
  .then((res) => {
    avatar.style.backgroundImage = `url(${res.avatar})`;
    })
  }
handleSubmit(makeRequest, evt, true)
};

function submitAddForm(evt) {
  function makeRequest() {
    return addNewCard({
    name: titleInput.value,
    link: urlInput.value
    })
  .then((res) => {
    const currentObject = {owner: {}};
    currentObject.name = res.name;
    currentObject.link = res.link;
    currentObject._id = res._id;
    currentObject.owner._id = res.owner._id;
    const newCard = createCard(currentObject);
    addCard(newCard);
    })
  }
  handleSubmit(makeRequest, evt, true)
};

function submitDeleteForm(evt) {
  function makeRequest() {
    return deleteCard(currentId)
    .then(() => {
      currentCard.remove();
      closePopup(deletePopup)
      })
  }
  handleSubmit(makeRequest, evt, true, 'Удаление...')
};

function setEditInputsValues() {
  usernameInput.value = username.textContent;
  descriptionInput.value = description.textContent;
};


editButton.addEventListener('click', () => {
  openPopup(editPopup);
  setEditInputsValues();
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
});

avatarButton.addEventListener('click', () => {
  openPopup(avatarPopup);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  popup.addEventListener('mousedown', (evt) => handleOverlay(evt,popup));
  button.addEventListener('click', () => closePopup(popup));
});

editForm.addEventListener('submit', submitEditForm);

addForm.addEventListener('submit', submitAddForm);

avatarForm.addEventListener('submit', submitAvatarForm);

deleteForm.addEventListener('submit', submitDeleteForm);

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    username.textContent = userData.name;
    description.textContent = userData.about;
    avatar.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;
    cards.forEach(initialElement => {
      const newCard = createCard(initialElement);
      addCard(newCard);
    })
  })
  .catch(console.error);

enableValidation(validationSelectors);




