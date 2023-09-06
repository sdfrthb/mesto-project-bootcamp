 const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
}

function showError(inputElement, errorText) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  errorElement.textContent = errorText;
  inputElement.classList.add('popup__input_type_error');
};

function hideError(inputElement) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove('popup__input_type_error');
};

function checkValid(inputElement) {
  if (!inputElement.validity.valid) {
    showError(inputElement, inputElement.validationMessage);
  } else {
        hideError(inputElement);
  }
}

function enableButton(button) {
  button.disabled = false;
};

function disableButton(button) {
  button.disabled = true;
};

function checkButton(formElement, button) {
  if (formElement.checkValidity()) {
    enableButton(button);
  } else {
    disableButton(button);
  }
};

function setEventListeners(formElement) {
  const inputList = formElement.querySelectorAll(validationSelectors.inputSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValid(inputElement);
      checkButton(formElement, formElement.lastElementChild)
    })
  });
};

function enableValidation() {
  const formList = document.querySelectorAll(validationSelectors.formSelector);
  const saveButtonList = document.querySelectorAll(validationSelectors.submitButtonSelector);
  disableButton(saveButtonList[1]);
  formList.forEach((formElement) => setEventListeners(formElement));
};

export {enableValidation}
