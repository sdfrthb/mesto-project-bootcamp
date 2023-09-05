function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => escapeClose(evt, popup));
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeClose);
};

function escapeClose(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
};

function overlayClose(evt, popup) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__container')) {
    closePopup(popup);
  }
};

 export {closePopup, openPopup, overlayClose};
