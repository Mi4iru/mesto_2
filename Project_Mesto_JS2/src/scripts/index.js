import "../pages/index.css";

import {
	enableValidation,
	toggleButtonState,
	hideInputError,
} from "../components/validate.js";
import { getModal } from "../components/modal.js";
import { createCard } from "../components/card.js";
import { 
	getInitialCards, 
	fillProfile,
	editProfile,
	addCard,
	editAvatar
} from "../components/api.js";

const profilePopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
const cardPopup = document.querySelector(".popup_type_new-card");
const avatarPopup = document.querySelector(".popup_type_update-avatar");

const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const profilePopupCloseButton = profilePopup.querySelector(".popup__close");
const cardPopupCloseButton = cardPopup.querySelector(".popup__close");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");
const avatarPopupCloseButton = avatarPopup.querySelector(".popup__close");

const profileFormElement = profilePopup.querySelector(".popup__form");
const cardFormElement = cardPopup.querySelector(".popup__form");
const avatarFormElement = avatarPopup.querySelector(".popup__form");

const nameInput = profilePopup.querySelector(".popup__input_type_name");
const jobInput = profilePopup.querySelector(".popup__input_type_description");
const cardNameInput = cardPopup.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardPopup.querySelector(".popup__input_type_url");
const avatarLinkInput = avatarPopup.querySelector(".popup__input_type_url");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const placesContainer = document.querySelector(".places__list");

const onOpenPopup = (popup) => {
	const formElement = popup.querySelector(validationSettings.formSelector);
	if (formElement) {
		const inputList = Array.from(
			formElement.querySelectorAll(validationSettings.inputSelector)
		);

		toggleButtonState(inputList, formElement, validationSettings);
	}
};

const onClosePopup = (popup) => {
	const formElement = popup.querySelector(validationSettings.formSelector);
	if (formElement) {
		const inputList = Array.from(
			formElement.querySelectorAll(validationSettings.inputSelector)
		);
		inputList.forEach((inputElement) => {
			hideInputError(formElement, inputElement, validationSettings);
		});
	}
};

const { openModal, closeModal } = getModal(onOpenPopup, onClosePopup);

let userId;
let user;

fillProfile().then(prof => {
	profileTitle.textContent = prof.name;
	profileDescription.textContent = prof.about;
	userId = prof._id;
	profileImage.style.backgroundImage = `url(${prof.avatar})`;
	user = prof;

})

getInitialCards().then(cards => {
	cards.forEach((card) => {
		let liked = false;
		for(let i=0; i<card.likes.length; i++){
			if (card.likes[i].name == user.name &&
				card.likes[i].about == user.about) {
					liked = true; 
					break
				}
		}
		const cardElement = createCard(
			card.name,
			card.link,
			card.likes,
			card.owner._id == userId,
			liked,
			card._id,
			imagePopup,
			imagePopupImage,
			imagePopupCaption,
			openModal
		);
		placesContainer.append(cardElement);
	});
});

profileImage.addEventListener("click", () => {
	avatarLinkInput.value = "";
	openModal(avatarPopup)
});
avatarPopupCloseButton.addEventListener("click", () => closeModal(avatarPopup));

function handleAvatarFormSubmit(evt) {
	evt.preventDefault();
	const link = avatarLinkInput.value;

	editAvatar(link)
		.then(res => {
			profileImage.style.backgroundImage = `url(${res.avatar})`;
			closeModal(avatarPopup);
		})
}

avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

profileEditButton.addEventListener("click", () => {
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileDescription.textContent;
	openModal(profilePopup);
});

profilePopupCloseButton.addEventListener("click", () =>
	closeModal(profilePopup)
);

function handleProfileFormSubmit(evt) {
	evt.preventDefault();
	const name = nameInput.value;
	const job = jobInput.value;

	editProfile(name, job)
		.then(res => res.json())
			.then(res => {
				profileTitle.textContent = res['name'];
				profileDescription.textContent = res.about;
				closeModal(profilePopup);
			})
	
	

	
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

profileAddButton.addEventListener("click", () => {
	cardNameInput.value = "";
	cardLinkInput.value = "";
	openModal(cardPopup);
});

cardPopupCloseButton.addEventListener("click", () => closeModal(cardPopup));

function handleCardFormSubmit(evt) {
	evt.preventDefault();
	const name = cardNameInput.value;
	const link = cardLinkInput.value;

	addCard(name, link)
		.then(res => res.json())
			.then(res => {
				const newCard = createCard(res.name, 
										   res.link, 
										   res.likes,
										   true,
										   false,
										   res._id,
										   imagePopup,
										   imagePopupImage,
										   openModal);
				placesContainer.prepend(newCard);
				closeModal(cardPopup);
			})
	
}

cardFormElement.addEventListener("submit", handleCardFormSubmit);
imagePopupCloseButton.addEventListener("click", () => closeModal(imagePopup));

profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");
avatarPopup.classList.add("popup_is_animated");

const validationSettings = {
	formSelector: ".popup__form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__button",
	inactiveButtonClass: "popup__button_disabled",
	inputErrorClass: "popup__input_type_error",
	errorClass: "popup__input-error_visible",
};

enableValidation(validationSettings);

profilePopup.addEventListener("click", (evt) => {
	if (evt.target === profilePopup) {
		closeModal(profilePopup);
	}
});
cardPopup.addEventListener("click", (evt) => {
	if (evt.target === cardPopup) {
		closeModal(cardPopup);
	}
});
avatarPopup.addEventListener("click", (evt) => {
	if (evt.target === avatarPopup) {
		closeModal(avatarPopup);
	}
});
imagePopup.addEventListener("click", (evt) => {
	if (evt.target === imagePopup) {
		closeModal(imagePopup);
	}
});
