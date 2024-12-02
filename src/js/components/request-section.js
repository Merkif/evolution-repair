import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(".section-request--bg", {
	"--pos-y":"40%",
}, {
	"--pos-y":"47%",
	scrollTrigger: {
		scrub:1.3,
		trigger:".section-request--bg",
		start:"clamp(center bottom)",
	}
});
