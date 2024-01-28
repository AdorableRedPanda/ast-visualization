export function initError (view: HTMLElement) {
	const el = document.createElement('pre');

	el.classList.add('error');

	const setError = (err: unknown) => {
		if (!err) {
			el.classList.remove('view');

			return;
		}

		el.innerHTML = JSON.stringify(err, null, '\t');
		el.classList.add('view');
	};

	view.appendChild(el);

	return { setError };
}
