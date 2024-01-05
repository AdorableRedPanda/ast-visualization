import { debounce } from '../utils';

export function initForm (input: HTMLTextAreaElement, onChange: (source: string) => void, initial = '') {
	if (initial) {
		input.value = initial;
		onChange(initial);
	}

	const handleChange = debounce(onChange, 1000);

	input.oninput = (ev) => {
		const source = input.value;

		if (!source) {
			return;
		}

		handleChange(source);
	};
}
