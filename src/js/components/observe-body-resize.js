import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { createBodyResizeObserver } from '../functions/resizeObserver.js';

gsap.registerPlugin(ScrollTrigger);

const bodyResizeObserver = createBodyResizeObserver(500);
bodyResizeObserver.start();
