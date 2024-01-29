import type { SourceLocation, ViewTree } from 'src/types';

import { Data } from 'vis-network/declarations/network/Network';
import { Network, Options } from 'vis-network/standalone/esm/vis-network';

const ViewOptions: Options = {
	layout: {
		hierarchical: {
			blockShifting: true,
			direction: 'UD',
			edgeMinimization: true,
			enabled: true,
			levelSeparation: 150,
			nodeSpacing: 100,
			parentCentralization: true,
			shakeTowards: 'roots',
			sortMethod: 'directed',
			treeSpacing: 200,
		},
	},
	nodes: {
		color: {
			background: '#e2e8f7',
			border: '#9083a4',
			highlight: {
				background: '#e2e4fd',
				border: '#5f5a73',
			},
		},
		font: {
			color: '#393342',
			face: 'Nunito',
			size: 18,
		},
		margin: {
			bottom: 5,
			left: 5,
			right: 5,
			top: 5,
		},
	},
};

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
