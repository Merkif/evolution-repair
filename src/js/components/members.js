import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();
const sectionTeam = document?.querySelector(".section-team");
const sectionTeamContent = sectionTeam?.querySelector(".section-team__content");
const membersList = sectionTeam?.querySelector("#members-scroll");
let getToValue = () => -(membersList.scrollWidth + sectionTeamContent.scrollWidth - window.innerWidth);

if (sectionTeam) {
	mm.add("(min-width: 768px)", () => {
		const scrollTween = gsap.to(membersList, {
			x: () => getToValue(),
			ease: "none",
			scrollTrigger: {
				scrub: 1.4,
				invalidateOnRefresh: true,
				invalidateOnResize: true,
				trigger: sectionTeam,
				pin: true,
				start: "clamp(center 55%)",
				end: () => "+=" +(membersList.scrollWidth + sectionTeamContent.scrollWidth - window.innerWidth),
			},
		});

		gsap.to(sectionTeamContent, {
			opacity:0,
			scale: 0.9,
			x:20,
			ease: "none",
			scrollTrigger: {
				trigger: membersList,
				scrub: 1.2,
				start: "left 60%",
				end: "left left",
				containerAnimation:scrollTween
			},
		});
	});
}
