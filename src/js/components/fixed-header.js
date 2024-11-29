const header = document.querySelector(".header--main");
const heroSection = document.querySelector(".section-hero");

const headerHeight = parseFloat(
	getComputedStyle(document.documentElement).getPropertyValue(
		"--header-height"
	)
);

if (header && heroSection) {
	let isSticky = false;
	let lastScrollY = window.scrollY;
	let isTicking = false;

	const handleScroll = () => {
		const currentScrollY = window.scrollY;

		if (currentScrollY > headerHeight && !isSticky) {
			header.classList.add("header--fixed");
			isSticky = true;
		} else if (currentScrollY <= headerHeight && isSticky) {
			header.classList.remove("header--fixed");
			isSticky = false;
		}

		lastScrollY = currentScrollY;
	};

	const onScroll = () => {
		if (!isTicking) {
			window.requestAnimationFrame(() => {
				handleScroll();
				isTicking = false;
			});
			isTicking = true;
		}
	};

	window.addEventListener("scroll", onScroll);
}
