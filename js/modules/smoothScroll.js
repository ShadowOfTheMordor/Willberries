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