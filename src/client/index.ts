import { initError, initForm, initView } from './components';
import { initWorker } from './initWorker';
import { getStoredCode, setLsCode } from './utils';

const viewContainer = document.getElementById('view_container');
const codeContainer = document.getElementById('form_container');


if (!viewContainer || !codeContainer) {
	throw 'Some container was not found';
}

const { onMessage, postMessage } = initWorker();

const onCodeChange = (source: string) => postMessage({ data: source, type: 'source' });

const { setSelected } = initForm(codeContainer, onCodeChange, getStoredCode());

const { setData } = initView(viewContainer, setSelected);

const { setError } = initError(viewContainer);

onMessage(({ data, type }) => {
	switch (type) {
		case 'source':
			setLsCode(data);
			break;
		case 'error':
			setError(data);
			break;
		case 'tree':
			setData(data);
			setError(null);
			break;
	}
});


console.info('Source code available: ', 'https://github.com/AdorableRedPanda/ast-visualization');
