import { gsap } from "gsap";

let tl = gsap.timeline();

tl.fromTo(
	".header--main",
	{
		opacity: 0,
		yPercent: -100,
	},
	{
		ease: "power4.out",
		delay:0.5,
		opacity: 1,
		yPercent: 0,
		duration: 1,
	}
);

tl.fromTo(
	".section-hero__button, .section-hero__title, .section-hero__desc",
	{
		opacity: 0,
		yPercent: -50,
	},
	{
		ease: "power4.out",
		opacity: 1,
		yPercent: 0,
		duration: 2,
		stagger: 0.2,
	},
	"-=0.8"
);

tl.fromTo(
	".feature",
	{
		opacity: 0,
	},
	{
		ease: "power4.out",
		opacity: 1,
		stagger: 0.2,
		duration: 2,
	},
	"-=2"
);

tl.from(
	".section-hero__img",
	{
		autoAlpha: 0,
		duration: 5,
		ease: "power4.out",
		opacity: 0,
	},
	"-=0.5"
);
