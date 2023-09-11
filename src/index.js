import './pages/index.css';
import {closePopup, openPopup, overlayClose, saveLoading, endOfSaveLoading} from './components/modal.js';
import {createCard, addCard, currentId, currentCard} from './components/card.js';
import {enableValidation, validationSelectors, disableButton} from './components/validate.js';
import {getUserData, getInitialCards, editProfile, addNewCard, editAvatar, deleteCard} from './components/api';


const editPopup = document.querySelector('.popup_type_edit-profile');
const addPopup = document.querySelector('.popup_type_add-card');
const photoPopup = document.querySelector('.popup_type_open-card');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
export const deletePopup = document.querySelector('.popup_type_delete-card');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar')
const closeButtons = document.querySelectorAll('.popup__close-button');

const editForm = editPopup.querySelector('.popup__form');
const addForm = addPopup.querySelector('.popup__form');
const avatarForm = avatarPopup.querySelector('.popup__form');
const deleteForm = deletePopup.querySelector('.popup__form');

const usernameInput = document.getElementById('username');
const descriptionInput = document.getElementById('description');
const titleInput = document.getElementById('title');
const urlInput = document.getElementById('url');
const photoInput = document.getElementById('photo')

const username = document.querySelector('.profile__username');
const description = document.querySelector('.profile__description');
const avatar = document.querySelector('.profile__avatar')

const popupPhoto = document.querySelector('.opened-card__photo');
const popupCaption = document.querySelector('.opened-card__caption');



function submitEditForm(event, button) {
  event.preventDefault();
  editProfile({
    username: usernameInput.value,
    description: descriptionInput.value
  })
  .then((res) => {
    username.textContent = res.name;
    description.textContent = res.about;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    endOfSaveLoading(button);
    closePopup(editPopup)
  });
};

function submitAvatarForm(event, button) {
  event.preventDefault();
  editAvatar({
    photo: photoInput.value
  })
  .then((res) => {
    avatar.style.backgroundImage = `url(${res.avatar})`;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    endOfSaveLoading(button);
    event.target.reset();
    closePopup(avatarPopup);
  });
};

function submitAddForm(event, button) {
  event.preventDefault();
  addNewCard({
    name: titleInput.value,
    link: urlInput.value
  })
  .then((res) => {
    console.log(res.owner._id)
    const currentObject = {owner: {}};
    currentObject.name = res.name;
    currentObject.link = res.link;
    currentObject._id = res._id;
    currentObject.owner._id = res.owner._id;
    console.log(currentObject)
    const newCard = createCard(currentObject);
    addCard(newCard);
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    endOfSaveLoading(button);
    event.target.reset();
    closePopup(addPopup);
  });
};

function submitDeleteForm(event) {
  event.preventDefault();
  deleteCard(currentId)
  .then(() => {
      currentCard.remove();
    })
  .catch((err) => {
      console.log(err);
    })
  .finally(() => closePopup(deletePopup))
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

editButton.addEventListener('click', () => {
  openPopup(editPopup);
  setEditInputsValues();
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
  disableButton(addPopup.querySelector(validationSelectors.submitButtonSelector));
});

avatarButton.addEventListener('click', () => {
  openPopup(avatarPopup);
  disableButton(avatarPopup.querySelector(validationSelectors.submitButtonSelector));
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  popup.addEventListener('mousedown', (evt) => overlayClose(evt,popup));
  button.addEventListener('click', () => closePopup(popup));
});

editForm.addEventListener('submit', (evt) => {
  saveLoading(editForm.lastElementChild);
  submitEditForm(evt, editForm.lastElementChild);
});

addForm.addEventListener('submit', (evt) => {
  saveLoading(addForm.lastElementChild);
  submitAddForm(evt, addForm.lastElementChild);
});

avatarForm.addEventListener('submit', (evt) => {
  saveLoading(avatarForm.lastElementChild);
  submitAvatarForm(evt, avatarForm.lastElementChild);
});

deleteForm.addEventListener('submit', (evt) => submitDeleteForm(evt));

getUserData()
.then((res) => {
  username.textContent = res.name;
  description.textContent = res.about;
  avatar.style.backgroundImage = `url(${res.avatar})`;
})
.catch((err) => {
  console.log(err);
})

getInitialCards()
.then((res) => {
  res.forEach(initialElement => {
    const newCard = createCard(initialElement);
    addCard(newCard);
  })
})
.catch((err) => {
  console.log(err);
})


enableValidation(validationSelectors);




