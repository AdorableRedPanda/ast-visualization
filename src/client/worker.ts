import type { Message } from 'src/types';

import { parseAst, transformAst } from '../lib';
import { skipTrace } from './utils';
const post = (message: Message) => postMessage(message);

addEventListener('message', (ev) => {
	const { data, type } = ev.data as Message;

	if (type !== 'source') {
		console.error('Worker doesn\'t support message type:', type);

		return;
	}

	try {
		const ast = parseAst(data);
		const tree = transformAst(ast);

		post({ data: tree, type: 'tree' });
		post({ data: data, type: 'source' });
	} catch (e) {
		post({ data: skipTrace(e), type: 'error' });
	}
});
