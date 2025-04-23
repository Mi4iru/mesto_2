const getModal = (onOpenPopup, onClosePopup) => {
	const openModal = (popup) => {
		onOpenPopup(popup);
		popup.classList.add("popup_is-opened");
		document.addEventListener("keydown", closeByEsc);
	};

	const closeModal = (popup) => {
		popup.classList.remove("popup_is-opened");
		onClosePopup(popup);
		document.removeEventListener("keydown", closeByEsc);
	};

	function closeByEsc(evt) {
		if (evt.key === "Escape") {
			const openedPopup = document.querySelector(".popup_is-opened");
			closeModal(openedPopup, onClosePopup);
		}
	}

	return {
		openModal,
		closeModal,
	};
};

export { getModal };
