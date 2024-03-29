import type { Message } from 'src/types';

const workerPath = import.meta.env.DEV
	? './worker/worker.ts'
	: `./worker.${import.meta.env.VITE_VERSION}.js`;

export const initWorker = () => {
	const worker = new Worker(workerPath, { type: 'module' });

	const postMessage = (message: Message) => worker.postMessage(message);

	const onMessage = (cb: (msg: Message) => void) => {
		worker.addEventListener('message', (ev) => {
			cb(ev.data);
		});
	};

	return { onMessage, postMessage };
};
