import { initEditor, initError, initView } from './components';
import { CODE_EXAMPLE, NO_CONTAINERS_ERROR } from './constants';
import { initWorker } from './initWorker';
import { getStoredCode, setLsCode } from './utils';

const viewContainer = document.getElementById('view_container');
const codeContainer = document.getElementById('editor_container');


if (!viewContainer || !codeContainer) {
	throw NO_CONTAINERS_ERROR;
}

const { onMessage, postMessage } = initWorker();

const onCodeChange = (source: string) => postMessage({ data: source, type: 'source' });

const { setSelected } = initEditor({
	container: codeContainer,
	initial: getStoredCode() || CODE_EXAMPLE,
	onChange: onCodeChange,
});

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

