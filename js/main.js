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
const cartCount = document.querySelector(".cart-count");
const modalCart = document.querySelector("#modal-cart");

const modalClose = modalCart.querySelector(".modal-close");

const modalForm = modalCart.querySelector(".modal-form");
const cartBuy = modalCart.querySelector(".cart-buy");
const modalGoodsClear = modalCart.querySelector(".modal-goods__clear");


const more = document.querySelector(".more");
const navigationLinks = document.querySelectorAll(".navigation-link");
const longGoodsList = document.querySelector(".long-goods-list");
const goods = [];

const cartTableGoods = document.querySelector(".cart-table__goods");
const cartTableTotal = document.querySelector(".cart-table__total");


// const getGoods = () => {

// 	const data = fetch("./db1/db.json")
// 		.then( (response) => {
// 			const resp = response.json();
// 			return resp;
// 		}, (response) => {
// 			throw "Получена ошибка : " + response.status;
// 		})
// 		.then((data) => {
// 			console.log(data);
// 			return data;
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 			return [];
// 		});
// 	return data;
// };


// const getGoods = async () => {
// 	const result = await fetch("./db/db.json")
// 		.then((result) => {
// 			if (!result.ok) {
// 				throw "ошибка вышла : " + result.status;
// 			}
// 			console.log(result);
// 	   		return await result.json();
// 		})
// 		.catch((err) => {
//    			console.log(err);
// 			return [];
// 		});
// };



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

const cart = {
	cartGoods: [
		{
			id: "099",
			name: "Часы Dior",
			price: 999,
			count: 2
		},
		{
			id: "090",
			name: "Кеды Адики",
			price: 9,
			count: 3
		}
	],

	renderCart()
	{
		// console.log("called");
		cartTableGoods.textContent = "";
		this.cartGoods.forEach(({id, name, price, count}) => {
			const trGood = document.createElement("tr");
			trGood.className = "cart-item";
			trGood.dataset.id = id;
			trGood.innerHTML = `
				<td>${name}</td>
				<td class="cart-td-price">${price}$</td>
				<td><button class="cart-btn-minus">-</button></td>
				<td class="cart-td-count">${count}</td>
				<td><button class="cart-btn-plus">+</button></td>
				<td class="cart-td-total">${price * count}$</td>
				<td><button class="cart-btn-delete">x</button></td>
			`;
			cartTableGoods.append(trGood);
		});
		this.recountTotalPrice();
		this.changeCartCounter();
	},
	deleteGood(id)
	{
		if (!this.cartGoods.length)
			return;
		const index = this.cartGoods.findIndex((good) => good.id === id);
		this.cartGoods.splice(index, 1);
		this.renderCart();
	},
	addGood(item)
	{
	},
	decreaseGoodAmount(id)
	{
		// this.cartGoods = this.cartGoods.filter((item) => item.id !== id);
		for (good of this.cartGoods)
		{
			if (good.id === id) {
				if (good.count === 1) {
					this.deleteGood(id);
				} else {
					good.count--;
				}
				break;
			}
		}
		this.changeCartCounter();
		// this.renderCart();
	},
	increaseGoodAmount(id)
	{
		// const good = this.cartGoods[this.cartGoods.findIndex((good) => good.id === id);
		// good.count += 1;
		for (good of this.cartGoods)
		{
			if (good.id === id) {
				good.count++;
				break;
			}
		}
		this.changeCartCounter();
		// this.renderCart();
	},
	recountTotalPrice()
	{
		// let total = 0;
		// this.cartGoods.forEach((good) => total += good.price * good.count);
		const total = this.cartGoods.reduce((sum, item) => {
			return sum + (item.price * item.count);
		}, 0);
		cartTableTotal.textContent = total + "$";
	},
	clearGoods()
	{
		this.cartGoods = [];
		this.renderCart();
	},
	tableEventController (target)
	{
		// const target = event.target;
		const trUpper = target.closest(".cart-item");
		const id = trUpper.dataset.id;
		const cartBtnMinus = trUpper.querySelector(".cart-btn-minus");
		const cartBtnPlus = trUpper.querySelector(".cart-btn-plus");
		const cartBtnDelete = trUpper.querySelector(".cart-btn-delete");

		const cartTdCount = trUpper.querySelector(".cart-td-count");
		const cartTdTotal = trUpper.querySelector(".cart-td-total");
		const currentGood = this.cartGoods[this.cartGoods.findIndex((good) => id === good.id)];
		if (target === cartBtnMinus || target === cartBtnPlus) {
			if (target === cartBtnMinus) {
				cart.decreaseGoodAmount(id);
			} else {
				cart.increaseGoodAmount(id);
			}
			cartTdCount.innerHTML = currentGood.count;
			cartTdTotal.innerHTML = currentGood.price * currentGood.count + "$";
			this.recountTotalPrice();
			return;
		}
		if (target === cartBtnDelete) {
			this.deleteGood(id);
		}
	},
	addGoodsToCart(id)
	{
		const goodItem = this.cartGoods.find((good) => good.id === id);
		if (goodItem) {
			this.increaseGoodAmount(id);
			this.renderCart();
		} else {
			getGoods()
				.then((data) => data.find((good) => good.id === id))
				.then(({id, name, price}) => {
					this.cartGoods.push({
						id,
						name,
						price,
						count: 1
					});
					this.changeCartCounter();
					// this.renderCart();
				});
		}
	},
	changeCartCounter() {
		const goodsTotal = this.cartGoods.reduce((sum, item) => {
			return sum + item.count;
		}, 0);
		cartCount.textContent = goodsTotal;
	}
	
};

cart.addGoodsToCart("001");
cart.addGoodsToCart("021");

document.body.addEventListener("click", (event) => {
	const addToCart = event.target.closest(".add-to-cart");
	if (addToCart) {
		if (addToCart.dataset.id) {
			cart.addGoodsToCart(addToCart.dataset.id);
		}
	}
});

cartTableGoods.addEventListener("click", (event) => {
	const target = event.target;
	cart.tableEventController(target);
});

modalGoodsClear.addEventListener("click", (event) => {
	cart.clearGoods();
});




const openModal = (event) => {
	document.addEventListener("keydown", escapeHandler);
	modalCart.classList.add("show");
	cart.renderCart();
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

// const renderCards = (data) => {

const renderCards = (data) => {
  	longGoodsList.textContent = "";
  	const cards = data.map(createCard);
  	longGoodsList.append(...cards);
  	document.body.classList.add("show-goods");
};

const renderAllGoods = () => {
   	getGoods().then((data) => {
   	// console.log(data);
   	renderCards(data);
	document.querySelector("#body").scrollIntoView({
		behavior: "smooth",
      		block: "start",
   		});

	});
};

more.addEventListener("click", (event) => {
	event.preventDefault();
	renderAllGoods();
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
		renderAllGoods();
	});
});

const bannerButtons = document.querySelectorAll(".banner-button");
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


