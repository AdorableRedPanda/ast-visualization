import type { ViewTree } from 'src/types';

import { Data } from 'vis-network/declarations/network/Network';
import { Network } from 'vis-network/standalone/esm/vis-network';

const ViewOptions = {
	layout: {
		hierarchical: {
			blockShifting: true,
			direction: 'UD',
			edgeMinimization: true,
			enabled: true,
			levelSeparation: 150,
			nodeSpacing: 100,
			parentCentralization: true,
			shakeTowards: 'roots', // roots, leaves
			sortMethod: 'directed', // hubsize, directed
			treeSpacing: 200,
		},
	},
};


export function initView (element: HTMLElement) {
	const network = new Network(element, {}, ViewOptions);

	return (data: ViewTree) => {
		network.setData(data as Data);
	};
}
