import TabController from "../functions/TabController.js";
import { register } from "swiper/element/bundle";
import { gsap } from "gsap";
import { animateOnScroll } from "../functions/animateOnScroll.js";

register();

const tabs = new TabController("#swiper-tabs", {
	onTabSwitch: (panel, oldTab, newTab) => {
		const cards = gsap.utils.toArray(".card", panel);
		let staggerFrom = "start";

		if (oldTab && oldTab.id > newTab.id) {
			staggerFrom = "end";
		} else {
			staggerFrom = "start";
		}

		if (oldTab) {
			initTabAnimation(cards, staggerFrom);
		}

		initSwiperInTabs(panel);
	},
});

function initSwiperInTabs(panel) {
	const swiperEl = panel.querySelector("swiper-container");

	if (!swiperEl) {
		console.debug("В панели отсутствует элемент <swiper-container>.");
		return;
	}

	if (swiperEl.swiper) {
		console.debug("Swiper уже инициализирован.");
		return;
	}

	swiperEl.initialize();
	console.debug("Swiper успешно инициализирован.");
}

function initTabAnimation(cards, from) {
	gsap.fromTo(
		cards,
		{
			opacity: 0,
		},
		{
			opacity: 1,
			stagger: {
				each: 0.1,
				from: from,
			},
		}
	);
}

//animate first tabpanel card in viewport
animateOnScroll(
	"#panel-0 .card",
	{
		from: {
			opacity: 0,
		},
		to: {
			opacity: 1,
			delay:.3,
			stagger: {
				each: 0.1,
				from: "start",
			},
		},
	},
	{
		threshold: 0.3,
	}
);

//animate tabs in viewport
animateOnScroll(
	".section-apartments .tabs__tab",
	{
		from: {
			opacity: 0,
		},
		to: {
			opacity: 1,
			stagger: {
				each: 0.1,
				from: "start",
			},
		},
	},
	{
		threshold: 0.3,
	}
);
