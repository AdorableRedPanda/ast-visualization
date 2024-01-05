import { ViewTree } from '../types';
import { initError, initForm, initView } from './components';
import { getStoredCode, httpRequest, setLsCode } from './utils';

async function sourceReq (source: string) {
	return await httpRequest<ViewTree>({ source }, '/tree', 'POST');
}

const viewEl = document.getElementById('view_container');
const codeEl = document.getElementById('code_sourcecode_input') as HTMLTextAreaElement | null;


if (viewEl && codeEl) {
	const updateData = initView(viewEl);
	const { hide: hideError, show: showError } = initError(viewEl);

	const onCodeChange = async (source: string) => {
		sourceReq(source)
			.then(updateData)
			.then(hideError)
			.then(() => setLsCode(source))
			.catch(
				(err) => showError(err),
			);
	};

	initForm(codeEl, onCodeChange, getStoredCode());
}


