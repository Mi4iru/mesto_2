const showInputError = (
	formElement,
	inputElement,
	errorMessage,
	validationSettings
) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(validationSettings.inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(validationSettings.errorClass);
};

const hideInputError = (formElement, inputElement, validationSettings) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(validationSettings.inputErrorClass);
	errorElement.classList.remove(validationSettings.errorClass);
	errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, validationSettings) => {
	if (!inputElement.validity.valid) {
		showInputError(
			formElement,
			inputElement,
			inputElement.validationMessage,
			validationSettings
		);
	} else {
		hideInputError(formElement, inputElement, validationSettings);
	}
};

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, formElement, validationSettings) => {
	const buttonElement = formElement.querySelector(
		validationSettings.submitButtonSelector
	);
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(validationSettings.inactiveButtonClass);
	} else {
		buttonElement.classList.remove(validationSettings.inactiveButtonClass);
	}
};

const setEventListeners = (formElement, validationSettings) => {
	const inputList = Array.from(
		formElement.querySelectorAll(validationSettings.inputSelector)
	);

	toggleButtonState(inputList, formElement, validationSettings);

	inputList.forEach((inputElement) => {
		inputElement.addEventListener("input", () => {
			checkInputValidity(formElement, inputElement, validationSettings);
			toggleButtonState(inputList, formElement, validationSettings);
		});
	});
};

const enableValidation = (validationSettings) => {
	const formList = Array.from(
		document.querySelectorAll(validationSettings.formSelector)
	);

	formList.forEach((formElement) => {
		setEventListeners(formElement, validationSettings);
	});
};

export { enableValidation, toggleButtonState, hideInputError };
