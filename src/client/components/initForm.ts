import { SourceLocation } from 'src/types';

import { debounce } from '../utils';

const appendInput = (container: HTMLElement) => {
	const el = document.createElement('textarea');
	el.placeholder = 'Type code here';
	el.spellcheck = false;
	el.className = 'sourcecode_input';
	el.ariaLabel = 'code';

	container.appendChild(el);

	return el;
};

export function initForm (container: HTMLElement, onChange: (source: string) => void, initial = '') {
	const input = appendInput(container);

	if (initial) {
		input.value = initial;
		onChange(initial);
	}

	const handleChange = debounce(onChange, 1000);

	input.oninput = () => {
		const source = input.value;

		handleChange(source);
	};


	const setSelected = (locs: SourceLocation[]) => {
		console.log(locs);
	};

	return { setSelected };
}
