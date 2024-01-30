import type { SourceLocation, ViewTree } from 'src/types';

import { Data } from 'vis-network/declarations/network/Network';
import { Network } from 'vis-network/standalone/esm/vis-network';

import { ViewOptions } from './constants';

interface ClickEvent {
	nodes: string[];
}

export function initView (element: HTMLElement, onSelect: (string: SourceLocation[]) => void) {
	const network = new Network(element, {}, ViewOptions);

	const locations = new Map<string, SourceLocation>();

	network.on('click', ({ nodes }: ClickEvent) => {
		const selectedLocs = nodes.map((id) => locations.get(id)).filter(Boolean);
		onSelect(selectedLocs as SourceLocation[]);
	});

	const setData = (data: ViewTree) => {
		network.setData(data as Data);

		locations.clear();

		data.nodes.map(({ id, loc }) => loc && locations.set(id, loc));
	};

	return { setData };
}
