export default class TabController {
	constructor(tabContainer, options = {}) {
		this.container = this._resolveElement(tabContainer);
		if (!this.container) {
			console.error("Tab container element not found.");
			return;
		}

		this.options = {
			onTabSwitch: options.onTabSwitch || (() => {}),
		};

		this.init();
	}

	/**
	 * Инициализация контроллера вкладок.
	 */
	init() {
		this._initializeElements();
		this._setupAccessibility();
		this._addEventListeners();
		this.activateTab(0); // Активируем первую вкладку по умолчанию
	}

	/**
	 * Поиск элементов вкладок и панелей.
	 */
	_initializeElements() {
		this.tabList =
			this.container.querySelector("[role='tablist']") ||
			this.container.querySelector("ul");
		this.tabs = Array.from(
			this.tabList.querySelectorAll("[role='tab'], a")
		);
		this.panels = Array.from(
			this.container.querySelectorAll(
				"[role='tabpanel'], [id^='section']"
			)
		);

		if (
			!this.tabList ||
			this.tabs.length === 0 ||
			this.panels.length === 0
		) {
			throw new Error(
				"Invalid structure: Tabs or panels not properly defined."
			);
		}
	}

	/**
	 * Настройка ARIA атрибутов для вкладок и панелей.
	 */
	_setupAccessibility() {
		this.tabList.setAttribute("role", "tablist");

		this.tabs.forEach((tab, index) => {
			tab.setAttribute("role", "tab");
			tab.setAttribute("id", `tab-${index}`);
			tab.setAttribute("aria-controls", `panel-${index}`);
			tab.setAttribute("tabindex", "-1");
			tab.setAttribute("aria-selected", "false");

			const parent = tab.parentElement;
			if (parent) parent.setAttribute("role", "presentation");
		});

		this.panels.forEach((panel, index) => {
			panel.setAttribute("role", "tabpanel");
			panel.setAttribute("id", `panel-${index}`);
			panel.setAttribute("aria-labelledby", `tab-${index}`);
			panel.setAttribute("tabindex", "-1");
			panel.hidden = true;
		});
	}

	/**
	 * Привязка событий для вкладок.
	 */
	_addEventListeners() {
		this.tabs.forEach((tab, index) => {
			tab.addEventListener("click", (event) =>
				this._handleTabClick(event, index)
			);
			tab.addEventListener("keydown", (event) =>
				this._handleKeyNavigation(event, index)
			);
		});
	}

	/**
	 * Обработчик клика по вкладке.
	 */
	_handleTabClick(event, index) {
		event.preventDefault();
		this.activateTab(index);
	}

	/**
	 * Обработчик навигации с клавиатуры.
	 */
	_handleKeyNavigation(event, index) {
		const { key } = event;
		const directions = {
			ArrowLeft: -1,
			ArrowRight: 1,
			Home: "first",
			End: "last",
		};

		if (!(key in directions)) return;

		event.preventDefault();

		if (directions[key] === "first") {
			this.activateTab(0, true);
		} else if (directions[key] === "last") {
			this.activateTab(this.tabs.length - 1, true);
		} else {
			const newIndex =
				(index + directions[key] + this.tabs.length) % this.tabs.length;
			this.activateTab(newIndex, true);
		}
	}

	/**
	 * Прокручивает контейнер, чтобы таб оказался в заданной позиции.
	 */
	_scrollIntoView(tab) {
		if (!tab || !this.tabList) return;

		const containerRect = this.tabList.getBoundingClientRect();
		const tabRect = tab.getBoundingClientRect();

		// Центрируем таб в пределах видимого контейнера
		const offset = tabRect.left - containerRect.left -
			(containerRect.width - tabRect.width) / 2;

		this.tabList.scrollBy({
			left: offset,
			behavior: "smooth",
		});
	}

	/**
	 * Активирует вкладку по индексу.
	 */
	activateTab(index, focus = false) {
		const newTab = this.tabs[index];
		const currentTab = this.tabs.find(
			(tab) => tab.getAttribute("aria-selected") === "true"
		);

		if (newTab !== currentTab) {
			this._switchTab(currentTab, newTab, focus);

			// Прокрутка к выбранному табу
			this._scrollIntoView(newTab);
		}
	}

	/**
	 * Переключает активную вкладку и панель.
	 */
	_switchTab(oldTab, newTab, focus) {
		if (oldTab) {
			oldTab.setAttribute("aria-selected", "false");
			oldTab.setAttribute("tabindex", "-1");
			const oldPanel = document.getElementById(
				oldTab.getAttribute("aria-controls")
			);
			if (oldPanel) oldPanel.hidden = true;
		}

		if (newTab) {
			newTab.setAttribute("aria-selected", "true");
			newTab.removeAttribute("tabindex");

			if (focus) {
				newTab.focus();
			}

			const newPanel = document.getElementById(
				newTab.getAttribute("aria-controls")
			);
			if (newPanel) newPanel.hidden = false;

			this.options.onTabSwitch(newPanel, newTab);
		}
	}

	/**
	 * Утилита для разрешения элемента из строки или DOM-объекта.
	 */
	_resolveElement(element) {
		return typeof element === "string"
			? document.querySelector(element)
			: element instanceof Element
			? element
			: null;
	}
}
