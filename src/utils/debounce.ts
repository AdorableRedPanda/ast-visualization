export const debounce = <T>(func: (...a: T[]) => void, delay: number) => {
	let timer: null | number = null;

	return (...args: T[]) => {
		if (timer !== null) {
			window.clearTimeout(timer);
		}

		timer = window.setTimeout(func, delay, ...args);
	};
};

