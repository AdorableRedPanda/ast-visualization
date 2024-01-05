export function initError (view: HTMLElement) {
	const el = document.createElement('pre');

	el.classList.add('view_container_error');

	const show = (err: unknown) => {
		el.innerHTML = JSON.stringify(err, null, '\t');
		el.classList.add('state_view');
	};

	const hide = () => {
		el.classList.remove('state_view');
	};

	view.appendChild(el);

	return { hide, show };
}
