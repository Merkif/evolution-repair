import { animateOnScroll } from "../functions/animateOnScroll.js";

//pricing cards
animateOnScroll(
	".section-pricing .pricing-card",
	{
		from: {
			opacity: 0,
			scale: 0.98,
		},
		to: {
			ease: "power2.inOut",
			opacity: 1,
			scale: 1,
			stagger: {
				each: 0.2,
			},
		},
	},
	{
		threshold: 0.3,
	}
);

//guarantee cards
animateOnScroll(
	".section-guarantee .guarantee",
	{
		from: {
			opacity: 0,
			y: 20,
		},
		to: {
			ease: "expo.out",
			opacity: 1,
			y: 0,
			stagger: {
				each: 0.15,
			},
		},
	},
	{
		threshold: 0.3,
	}
);

//section-stages cards
animateOnScroll(
	".section-stages .stage-card",
	{
		from: {
			opacity: 0,
			y: 50,
			scale: 0.9,
		},
		to: {
			ease: "expo.out",
			opacity: 1,
			y: 0,
			scale: 1,
			stagger: {
				each: 0.15,
			},
		},
	},
	{
		threshold: 0.3,
	}
);

//section-portfolio cards
animateOnScroll(
	".section-portfolio .project-card",
	{
		from: {
			opacity: 0,
			y: 50,
			scale: 0.9,
		},
		to: {
			ease: "expo.out",
			opacity: 1,
			y: 0,
			scale: 1,
			stagger: {
				each: 0.2,
			},
		},
	},
	{
		threshold: 0.3,
	}
);

//section-team cards
animateOnScroll(
	".section-team .team-member",
	{
		from: {
			opacity: 0,
		},
		to: {
			opacity: 1,
			stagger: {
				each: 0.1,
			},
		},
	},
	{
		threshold: 0.1,
	}
);

//guarantee cards
animateOnScroll(
	".section-contact .contact-list__item",
	{
		from: {
			opacity: 0,
			y: 20,
		},
		to: {
			ease: "expo.out",
			opacity: 1,
			y: 0,
			duration:1,
			stagger: {
				each: 0.15,
			},
		},
	},
	{
		threshold: 0.3,
	}
);
