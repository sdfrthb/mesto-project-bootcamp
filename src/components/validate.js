validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


function showError(inputElement, errorText) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  errorElement.textContent = errorText;
  inputElement.classList.add('popup_opened');
};

function hideError(inputElement) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.add('popup_opened');
};

function showErrorLine(inputElement, selectors) {
  inputElement.classList.add(selectors.inputErrorClass);
};

function hideErrorLine(inputElement, selectors) {
  inputElement.classList.remove(selectors.inputErrorClass);
};

function unableButton(button) {
  button.disabled = false;
};

function disableButton(button) {
  button.disabled = true;
};

function checkValid(inputElement) {
  if (!inputElement.validity.valid) {
    showError(inputElement, inputElement.validationMessage);
    showErrorLine(inputElement,selectors);
  } else {
    hideError(inputElement);
    hideErrorLine(inputElement,selectors);
  }
};

function checkButton(form, button) {
  if (form.checkValidity()) {
    unableButton(button);
  } else {
    disableButton(button);
  }
};

function enableValidation(selectors) {
  const formList = document.querySelectorAll(selectors.formSelector);
  const saveButtonList = document.querySelectorAll(selectors.submitButtonSelector);
  disableButton(saveButtonList[1]);
  formList.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  });
};

function setEventListeners(formElement, selectors) {
  const inputList = formElement.querySelectorAll(selectors.inputSelector);
  inputList.forEach(inputElement => inputElement.addEventListener('input', () => {
    checkValid(inputElement);
    checkButton(formElement, formElement.lastElementChild)
  }));
}
