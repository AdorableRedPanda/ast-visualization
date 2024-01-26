import { initError, initForm, initView } from './components';
import { initWorker } from './initWorker';
import { getStoredCode, setLsCode } from './utils';

const viewEl = document.getElementById('view_container');
const codeEl = document.getElementById('code_sourcecode_input') as HTMLTextAreaElement | null;


if (viewEl && codeEl) {
	const updateData = initView(viewEl);
	const { hide: hideError, show: showError } = initError(viewEl);

	const { onMessage, postMessage } = initWorker();

	onMessage(({ data, type }) => {
		switch (type) {
			case 'source':
				setLsCode(data);
				break;
			case 'error':
				showError(data);
				break;
			case 'tree':
				updateData(data);
				hideError();
				break;
		}
	});

	const onCodeChange = (source: string) => postMessage({ data: source, type: 'source' });

	initForm(codeEl, onCodeChange, getStoredCode());
}
