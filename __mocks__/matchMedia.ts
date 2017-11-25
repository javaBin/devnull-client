// tslint:disable-next-line:only-arrow-functions
window.matchMedia = window.matchMedia || function () {
	return {
		media: '',
		matches: false,
		addListener: () => undefined,
		removeListener: () => undefined
	}
}

window.requestAnimationFrame = (callback) => {
	setTimeout(callback, 0)
	return 0
}

