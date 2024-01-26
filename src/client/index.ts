import type { Message } from 'src/types';

import { initError, initForm, initView } from './components';
import { getStoredCode, setLsCode } from './utils';

const viewEl = document.getElementById('view_container');
const codeEl = document.getElementById('code_sourcecode_input') as HTMLTextAreaElement | null;

const worker = new Worker('./worker', { type: 'module' });

const postToWorker = (source: string) => {
	worker.postMessage({ data: source, type: 'source' });
};

if (viewEl && codeEl) {
	const updateData = initView(viewEl);
	const { hide: hideError, show: showError } = initError(viewEl);

	const onCodeChange = (source: string) => {
		postToWorker(source);
	};

	worker.addEventListener('message', (ev) => {
		const { data, type } = ev.data as Message;

		switch (type) {
			case 'source':
				setLsCode(data);
				break;
			case 'error':
				showError(data);
				console.error(data);
				break;
			case 'tree':
				updateData(data);
				hideError();
				break;
		}
	});

	initForm(codeEl, onCodeChange, getStoredCode());
}
