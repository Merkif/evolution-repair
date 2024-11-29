export const getHeaderHeight = () => {
	const header = document.querySelector('header.header');
	if(header) {
		const headerHeight = header.offsetHeight;
		document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);
	}
}
