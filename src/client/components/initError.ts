export function initError (view: HTMLElement) {
	const el = document.createElement('pre');

	el.classList.add('view_container_error');

	const setError = (err: unknown) => {
		if (!err) {
			el.classList.remove('state_view');

			return;
		}

		el.innerHTML = JSON.stringify(err, null, '\t');
		el.classList.add('state_view');
	};

	view.appendChild(el);

	return { setError };
}
