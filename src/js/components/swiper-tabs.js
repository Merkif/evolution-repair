import TabController from "../functions/TabController.js";
import { register } from 'swiper/element/bundle';

register();

const tabs = new TabController('#swiper-tabs', {
    onTabSwitch: (panel) => {
        const swiperEl = panel.querySelector('swiper-container');

        if (!swiperEl) {
            console.debug('В панели отсутствует элемент <swiper-container>.');
            return;
        }

        if (swiperEl.swiper) {
            console.debug('Swiper уже инициализирован.');
            return;
        }

        swiperEl.initialize();
        console.debug('Swiper успешно инициализирован.');
    }
});
