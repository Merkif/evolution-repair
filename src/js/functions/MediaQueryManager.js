class MediaQueryManager {
	constructor() {
		this.queries = new Map();
		this.handleResize = this.handleResize.bind(this); // Привязка контекста
		window.addEventListener('resize', this.handleResize);
	}

	/**
	 * Добавляет медиазапрос и обработчики для него
	 * @param {string} query - строка медиазапроса, например '(max-width: 768px)'
	 * @param {function} onMatch - обработчик, когда медиазапрос совпадает
	 * @param {function} onUnmatch - обработчик, когда медиазапрос больше не совпадает (опционально)
	 */
	add(query, onMatch, onUnmatch = null) {
		const mql = window.matchMedia(query);

		const handler = (e) => {
			try {
				if (e.matches) {
					onMatch();
				} else if (onUnmatch) {
					onUnmatch();
				}
			} catch (error) {
				console.error(`Error in media query handler for '${query}':`, error);
			}
		};

		handler(mql);

		mql.addEventListener('change', handler);

		this.queries.set(query, { mql, handler });
	}

	/**
	 * Удаляет медиазапрос и его обработчики
	 * @param {string} query - строка медиазапроса
	 */
	remove(query) {
		if (!this.queries.has(query)) {
			console.warn(`Media query '${query}' does not exist.`);
			return;
		}
		const queryObj = this.queries.get(query);
		queryObj.mql.removeEventListener('change', queryObj.handler);
		this.queries.delete(query);
	}

	/**
	 * Метод вызывается при изменении размера окна
	 */
	handleResize() {
		this.queries.forEach(({ mql, handler }) => {
			handler(mql);
		});
	}

	/**
	 * Полная очистка всех медиазапросов и обработчиков
	 */
	clear() {
		this.queries.forEach(({ mql, handler }) => {
			mql.removeEventListener('change', handler);
		});
		this.queries.clear();
		window.removeEventListener('resize', this.handleResize);
	}
}

export default MediaQueryManager;
