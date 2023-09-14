 const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__input_type_error'
}

function showError(inputElement, errorText, settings) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  errorElement.textContent = errorText;
  inputElement.classList.add(settings.inputErrorClass);
};

function hideError(inputElement, settings) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(settings.inputErrorClass);
};

function checkValid(inputElement, settings) {
  if (!inputElement.validity.valid) {
    showError(inputElement, inputElement.validationMessage, settings);
  } else {
        hideError(inputElement, settings);
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

function setEventListeners(formElement, settings) {
  const inputList = formElement.querySelectorAll(settings.inputSelector);
  const saveButton = formElement.querySelector(settings.submitButtonSelector);
  disableButton(saveButton);
  formElement.addEventListener('reset', () => disableButton(saveButton))
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValid(inputElement, settings);
      checkButton(formElement, saveButton)
    })
  });
};

function enableValidation(settings) {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formElement) => {
    if (formElement.querySelector(settings.inputSelector)) {
      setEventListeners(formElement, settings)
    }
  });
};

export {enableValidation, validationSelectors, disableButton}
