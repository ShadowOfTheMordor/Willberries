const mySwiper = new Swiper(".swiper-container", {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: ".slider-button-next",
    	prevEl: ".slider-button-prev",
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
};

const closeModal = (event) => {
  	document.removeEventListener("keydown", escapeHandler);
  	modalCart.classList.remove("show");
};

const escapeHandler = (event) => {
	// console.log("inside, event.code = " + event.code);
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

// {
// 	const scrollLinks = document.querySelectorAll("a.scroll-link");
// 	scrollLinks.forEach((item) => {
// 		item.addEventListener("click", (event) => {
// 			event.preventDefault();
// 			const id = item.getAttribute("href");
// 			document.querySelector(id).scrollIntoView({
// 				behavior: "smooth",
// 				block: "start"
// 			});
// 		});
// 	});

// }

{
	const scrollLinks = document.querySelectorAll("a.scroll-link");
  	const scrollLinkWrap = document.querySelector(".scroll-link-wrap");

  	scrollLinkWrap.addEventListener("click", (event) => {
    	for (const scrollLink of scrollLinks) {
			event.preventDefault();
			const id = scrollLink.getAttribute("href");
			document.querySelector(id).scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
    	}
  	});
}

//goods

const more = document.querySelector(".more");
const navigationLinks = document.querySelectorAll(".navigation-link");
const longGoodsList = document.querySelector(".long-goods-list");

const goods = [];
//const

const getGoods = async () => {
	const result = await fetch("./db/db.json");
  	try {
  		if (!result.ok) {
      		throw "ошибка вышла : " + result.status;
    	} else {
      		return await result.json();
    	}
  	} catch (err) {
    	console.log(err);
		return [];
	}
};

// try {
//   getGoods().then((data) => {
//     console.log(data);
//     renderCards(data);
//   });
// } catch (err) {
//   console.log(err);
// }

// {
//     "id": "007",
//     "img": "img/71AogkKMguL.jpg",
//     "name": "ECCO Biom Aex Luxe Hydromax Water-Resistant Cross Trainer",
//     "label": "",
//     "description": "Black",
//     "price": "199",
//     "category": "Shoes",
//     "gender": "Mens"
//   },

const createCard = ({label, img, category, name, description, id, price} ) => {
  const card = document.createElement("div");
  card.className = "col-lg-3 col-sm-6";
  card.innerHTML = `
	<div class = "goods-card">
		${label ? `<span class = "label"> ${label} </span>` : ""}
		
		<!--/.label -->
		<img src="./db/${img}" alt="${name}" class="goods-image">
		<h3 class="goods-title"> ${name} </h3>
		<!--/.goods-title -->
		<p class = "goods-description"> ${description} </p>
		<!--/.goods-description -->
		<!--/.goods-price -->
		<button class="button goods-card-btn add-to-cart" data-id="${id}">
			<span class="button-price">$${price}</span>
		</button>
	</div>
	`;

	// console.log(card);
  	return card;
};

const renderCards = (data) => {
  	longGoodsList.textContent = "";
  	const cards = data.map(createCard);
  	longGoodsList.append(...cards);
  	document.body.classList.add("show-goods");
};

more.addEventListener("click", (event) => {
	event.preventDefault();
	try {
    	getGoods().then((data) => {
	    	// console.log(data);
	    	renderCards(data);
			document.querySelector("#body").scrollIntoView({
    			behavior: "smooth",
	      		block: "start",
    		});

		});
  	} catch (err) {
    	console.log(err);
  	}

})

const filterCards = (field, value) => {
	getGoods()
		.then((data) => {
    	    const filteredGoods = data.filter((good) => {
        	    return good[field] === value;
        	});
        	return filteredGoods;
    	})
		.then(renderCards);
}

// filterCards("gender", "Womens");

navigationLinks.forEach((navigationLink) => {
	navigationLink.addEventListener("click", (event) => {
		event.preventDefault();
		const target = event.target;

		const field = target.dataset.field;
		const value = target.textContent;
		if (field) {
			filterCards(field, value);
			return;
		}
		getGoods().then(renderCards);
	});
});

const bannerButtons = document.querySelectorAll(".banner-button");
console.log(bannerButtons);
bannerButtons.forEach((bannerButton) => {
	bannerButton.addEventListener("click", (event) => {
		const target = event.target;
		const field = target.dataset.field;
		const value = target.dataset.value;
		filterCards(field, value);
		document.querySelector("#body").scrollIntoView({
			behavior: "smooth",
			  block: "start",
		});

	});
})

/*
<div class="col-lg-3 col-sm-6">
<div class="goods-card">
	<span class="label">New</span>
	<!-- /.label --><img src="img/image-119.jpg" alt="image: Hoodie" class="goods-image">
	<h3 class="goods-title">Embroidered Hoodie</h3>
	<!-- /.goods-title -->
	<p class="goods-description">Yellow/Lilac/Fuchsia/Orange</p>
	<!-- /.goods-description -->
	<!-- /.goods-price -->
	<button class="button goods-card-btn add-to-cart" data-id="007">
		<span class="button-price">$89</span>
	</button>
</div>
<!-- /.goods-card -->
</div>
*/

// const getData = async () => {

// 	const data = fetch("./db/db.json").
// 	then( (response) => {
// 		const resp = response.json();
// 		return resp;
// 	}, (response) => {
// 		console.log("Получена ошибка : " + response.status);
// 	}).
// 	then(async (data) => {
// 		console.log(data);
// 		return await data;
// 	})
// 	// catch((error) => {
// 	// 	console.log(error);
// 	// 	return [];
// 	// });
// 	console.log(data);
// 	return await data;
// };

// const data = getData();
// console.log("data = " + data);
