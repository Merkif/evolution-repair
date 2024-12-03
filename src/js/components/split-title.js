import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const splitText = new SplitType(".split-title", { types: "words, chars" });

splitText.elements.forEach((el) => {
	const chars = gsap.utils.toArray('.char', el);
	gsap.from(chars, {
		opacity: 0.2,
		stagger: 0.1,
		delay: 0.2,
		duration: 1,
		ease: "back.out",
		scrollTrigger: {
			once:true,
			trigger: el,
			start: "clamp(top 90%)",
			end: "clamp(top 7%)",
			scrub: 1.2,
			refreshPriority: 0,
			toggleActions: "play pause resume reset"
		},
	});
});
