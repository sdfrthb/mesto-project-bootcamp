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

const card = document.getElementById('card').content;
const cardList = document.querySelector('.gallery__cards');

const popupPhoto = document.querySelector('.opened-card__photo');
const popupCaption = document.querySelector('.opened-card__caption');


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function submitEditForm(event) {
  event.preventDefault();
  username.textContent = usernameInput.value;
  description.textContent = descriptionInput.value;
  closePopup(editPopup);
}

function submitAddForm(event) {
  event.preventDefault();
  const currentObject = {};
  currentObject.name = titleInput.value;
  currentObject.link = urlInput.value;
  const newCard = createCard(currentObject);
  addCard(newCard);
  event.target.reset()
}

function setEditInputsValues() {
  usernameInput.value = username.textContent;
  descriptionInput.value = description.textContent;
}

function createCard(currentElement) {
  const newCard = card.cloneNode(true);
  const cardTitle = currentElement.name;
  const cardUrl = currentElement.link;
  const cardLike = newCard.querySelector('.gallery__like-button');
  const cardDeleteButton = newCard.querySelector('.gallery__delete-button');
  const cardPhoto = newCard.querySelector('.gallery__photo')
  cardPhoto.setAttribute('src', cardUrl);
  cardPhoto.setAttribute('alt', cardTitle);
  newCard.querySelector('.gallery__place').textContent = cardTitle;
  cardLike.addEventListener('click', () => cardLike.classList.toggle('gallery__like-button_active'));
  cardDeleteButton.addEventListener('click', () => cardDeleteButton.closest('.gallery__card').remove());
  cardPhoto.addEventListener('click', () => setCardPopup(cardTitle, cardUrl));
  return newCard;
}

function addCard(card) {
  cardList.prepend(card);
}

function setCardPopup(cardTitle, cardUrl) {
  popupPhoto.setAttribute('src', cardUrl);
  popupPhoto.setAttribute('alt', cardTitle);
  popupCaption.textContent = cardTitle;
  openPopup(photoPopup);
}


initialCards.forEach(initialElement => {
  const newCard = createCard(initialElement);
  addCard(newCard);
});

editButton.addEventListener('click', () => {
  openPopup(editPopup);
  setEditInputsValues();
});

addButton.addEventListener('click', () => openPopup(addPopup));

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

editForm.addEventListener('submit', submitEditForm);
addForm.addEventListener('submit', submitAddForm);


