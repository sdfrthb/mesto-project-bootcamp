function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeClose);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeClose);
};

function escapeClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

function overlayClose(evt, popup) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__container')) {
    closePopup(popup);
  }
};

 export {closePopup, openPopup, overlayClose};
