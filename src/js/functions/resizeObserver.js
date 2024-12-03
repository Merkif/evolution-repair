import { ScrollTrigger } from "gsap/ScrollTrigger.js";

/**
 * Инициализирует ResizeObserver для наблюдения за изменениями размеров body
 * с защитой от лишних вызовов ScrollTrigger.refresh() через дебаунсинг.
 *
 * @param {number} debounceDelay - Задержка в миллисекундах для минимизации вызовов ScrollTrigger.refresh().
 * @returns {{ start: () => void, stop: () => void }} Объект с методами start и stop для управления наблюдением.
 */
export function createBodyResizeObserver(debounceDelay = 300) {
	let resizeObserver;
	let timeout;

	// Дебаунс-функция для ScrollTrigger.refresh()
	const debouncedRefresh = () => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			ScrollTrigger.refresh();
		}, debounceDelay);
	};

	// Запуск наблюдения
	const start = () => {
		if (resizeObserver) {
			return;
		}

		resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				if (entry.target === document.body) {
					debouncedRefresh();
				}
			}
		});

		resizeObserver.observe(document.body);
	};

	// Остановка наблюдения
	const stop = () => {
		if (resizeObserver) {
			resizeObserver.disconnect();
			resizeObserver = null;
		} else {
			console.warn("ResizeObserver не был запущен");
		}
	};

	return { start, stop };
}
