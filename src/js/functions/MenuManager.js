export default class MenuManager {
	constructor(options = {}) {
		this.scrollY = 0;
		this.expanded = false;
		this.options = options;
		this.init();
	}

	init() {
		this.menuButton = this.options.menuButton || '.menu__button';
		this.menu = this.options.menu || '.menu__list--main';
		this.menuOpenClass = this.options.menuOpenClass || 'menu__list--open';
		this.onMenuOpen = this.options.onMenuOpen || (() => { });
		this.onMenuClose = this.options.onMenuClose || (() => { });

		this.menuButtonElement = document.querySelector(this.menuButton);
		this.menuElement = document.querySelector(this.menu);

		if (this.menuButtonElement) {
			this.menuButtonElement.addEventListener('click', this.toggleMenu.bind(this));
		}
	}

	openMenu() {
		if (!this.menuButtonElement || !this.menuElement) {
			return;
		}

		this.scrollY = window.scrollY;
		document.documentElement.style.setProperty('--window-scroll-y', `-${this.scrollY}px`);
		document.documentElement.classList.toggle('menu-open', true);

		this.menuButtonElement.setAttribute('aria-expanded', 'true');
		this.menuButtonElement.setAttribute('aria-label', 'Закрыть меню');

		this.menuButtonElement.classList.toggle('menu__button--open', true);
		this.menuElement.classList.toggle(this.menuOpenClass, true);

		this.onMenuOpen();
	}

	closeMenu() {
		if (!this.menuButtonElement || !this.menuElement) {
			return;
		}

		this.menuButtonElement.setAttribute('aria-expanded', 'false');
		this.menuButtonElement.setAttribute('aria-label', 'Открыть меню');

		this.handleMenuClosing();
	}

	handleMenuClosing() {
		this.menuButtonElement.setAttribute('aria-expanded', 'false');
		this.menuButtonElement.setAttribute('aria-label', 'Открыть меню');

		this.menuButtonElement.classList.toggle('menu__button--open', false);
		this.menuElement.classList.toggle(this.menuOpenClass, false);

		document.documentElement.classList.toggle('menu-open', false);
		window.scrollTo(0, this.scrollY);
		document.documentElement.style.removeProperty('--window-scroll-y');

		this.onMenuClose();
	}

	toggleMenu() {
		this.expanded = !this.expanded;
		this.expanded ? this.openMenu() : this.closeMenu();
	}
}
