import type { Message } from 'src/types';

import { parseAst, transformAst } from '../lib';
const post = (message: Message) => postMessage(message);

export const skipTrace = (e: unknown) => (typeof e === 'object' && e ? { ...e } : e);
addEventListener('message', (ev) => {
	const { data, type } = ev.data as Message;

	if (type !== 'source') {
		console.error('Worker doesn\'t support message type:', type);

		return;
	}

	try {
		const source = data.trim();

		if (source) {
			const ast = parseAst(source);
			const tree = transformAst(ast);

			post({ data: tree, type: 'tree' });
		}

		post({ data: data, type: 'source' });
	} catch (e) {
		post({ data: skipTrace(e), type: 'error' });
	}
});

console.info('worker initialized');
