import MediaQueryManager from "../functions/MediaQueryManager.js";

const headerDropdownItems = document.querySelectorAll('.menu__link--dropdown');
const mqManager = new MediaQueryManager();
const headerDropdownHandler = createDropdownHandler(headerDropdownItems, 'menu__item--open');

function createDropdownHandler(items, className = 'open') {
	let isEventListenersAdded = false;

	function enableDropdownMenu() {
		if (!isEventListenersAdded) {
			items.forEach(item => item.addEventListener('click', toggleDropdown));
			isEventListenersAdded = true;
		}
	}

	function disableDropdownMenu() {
		if (isEventListenersAdded) {
			items.forEach(item => item.removeEventListener('click', toggleDropdown));
			isEventListenersAdded = false;
		}
	}


	function toggleDropdown(event) {
		event.preventDefault();
		const parentEl = this.parentElement;


		parentEl.classList.toggle(`${className}`);
	}


	return { enableDropdownMenu, disableDropdownMenu };
}

mqManager.add(
	'(max-width: 1024px)',
	headerDropdownHandler.enableDropdownMenu,
	headerDropdownHandler.disableDropdownMenu
);
