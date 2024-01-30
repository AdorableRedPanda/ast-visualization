import styles from './styles.module.css';

export function initError (view: HTMLElement) {
	const el = document.createElement('pre');

	el.classList.add(styles.error);

	const setError = (err: unknown) => {
		if (!err) {
			el.classList.remove(styles.view);

			return;
		}

		el.innerHTML = JSON.stringify(err, null, '\t');
		el.classList.add(styles.view);
	};

	view.appendChild(el);

	return { setError };
}
