function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
};

function saveLoading(button) {
  button.textContent = 'Сохранение...';
}

function endOfSaveLoading(button) {
  button.textContent = 'Сохранить';
}

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

function handleOverlay(evt, popup) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__container')) {
    closePopup(popup);
  }
};

 export {closePopup, openPopup, handleOverlay, saveLoading, endOfSaveLoading};
