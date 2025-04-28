import {deleteCard} from "../components/api.js";


function createCard(name, link, likes, owner, cardId, imagePopup, imagePopupImage, imagePopupCaption, openModal) {
	const cardTemplate = document.querySelector("#card-template").content;
	const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

	const cardName = cardElement.querySelector(".card__title");
	const cardImage = cardElement.querySelector(".card__image");
	const cardLikes = cardElement.querySelector(".card__like-counter");

	cardName.textContent = name;
	cardImage.src = link;
	cardImage.alt = name;
	cardLikes.textContent = likes.length;

	const likeButton = cardElement.querySelector(".card__like-button");
	likeButton.addEventListener("click", () =>
		likeButton.classList.toggle("card__like-button_is-active")
	);

	const deleteButton = cardElement.querySelector(".card__delete-button");
	if (owner){
		deleteButton.addEventListener("click", () => {
			deleteCard(cardId)
				.then(res => {
					deleteButton.closest(".card").remove();
					console.log(res.json())
				})
		}	
		);
	}
	else {
		deleteButton.disabled = true;
		deleteButton.style.display = 'none';
	}

	cardImage.addEventListener("click", () => {
		imagePopupImage.src = link;
		imagePopupImage.alt = name;
		imagePopupCaption.textContent = name;
		openModal(imagePopup);
	});

	return cardElement;
}

export { createCard };
