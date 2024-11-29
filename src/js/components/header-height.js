import { getHeaderHeight } from "../functions/header-height.js";
import { throttle } from "../functions/throttle.js";

getHeaderHeight();

let throttleHeaderHeight = throttle(getHeaderHeight);
window.addEventListener('resize', throttleHeaderHeight);
