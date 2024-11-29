import MenuManager from "../functions/MenuManager.js";

const page = document.documentElement;
const menu = new MenuManager({
	menu: '.menu__container',
	menuOpenClass: 'menu__container--open',
	onMenuOpen() {
		page.classList.remove('page--smooth');
	},
	onMenuClose() {
		setTimeout(() => {
			page.classList.add('page--smooth');
		}, 500);

		closeAllDropdowns(menu);
	}
});

function closeAllDropdowns(menu) {
	const dropdowns = menu.menuElement.querySelectorAll('.menu__item--open');
	dropdowns.forEach(dropdown => {
		if(dropdown.classList.contains('menu__item--open')) {
			dropdown.classList.remove('menu__item--open');
		}
	});
}
