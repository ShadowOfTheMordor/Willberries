const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});


//cart 

const buttonCart = document.querySelector(".button-cart");
const modalCart = document.querySelector("#modal-cart");

const modalClose = modalCart.querySelector(".modal-close");

const modalForm = modalCart.querySelector(".modal-form");
const cartBuy = modalCart.querySelector(".cart-buy");

const openModal = (event) => {
	document.addEventListener("keydown", escapeHandler);
	modalCart.classList.add("show");
}

const closeModal = (event) => {
	document.removeEventListener("keydown", escapeHandler);
	modalCart.classList.remove("show");
}

const escapeHandler = (event) => {
	console.log("inside, event.code = " + event.code);
	if (event.code === "Escape") {
		closeModal(event);
	}
};

buttonCart.addEventListener("click", (event) => {
	openModal();
});

modalCart.addEventListener("click", (event) => {
	const target = event.target;
	if (target === modalCart || target === modalClose) {
		closeModal();
		return;
	}
	if (target.closest(".cart-buy") === cartBuy) {
		event.preventDefault();
		closeModal();
		return;
	}

});


//scroll smooth


// () => {
// 	const scrollLink = document.querySelectorAll("a.scroll-link");
// 	scrollLink.forEach((item) => {
// 		item.addEventListener("click", (event) => {
// 			event.preventDefault();
// 			const id = item.getAttribute("href");
// 			document.querySelector(id).scrollIntoView({
// 				behavior: "smooth",
// 				block: "start"
// 			});
// 		});
// 	});
	
// }();


{
	const scrollLink = document.querySelectorAll("a.scroll-link");
	scrollLink.forEach((item) => {
		item.addEventListener("click", (event) => {
			event.preventDefault();
			const id = item.getAttribute("href");
			document.querySelector(id).scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		});
	});
	
}
