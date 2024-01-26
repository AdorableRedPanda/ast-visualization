import type { ViewTree } from 'src/types';

import { Data } from 'vis-network/declarations/network/Network';
import { Network } from 'vis-network/standalone/esm/vis-network';

import { ViewOptions } from '../constants';

export function initView (element: HTMLElement) {
	const network = new Network(element, {}, ViewOptions);

	return (data: ViewTree) => {
		network.setData(data as Data);
	};
}
