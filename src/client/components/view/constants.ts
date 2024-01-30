import { Options } from 'vis-network/standalone/esm/vis-network';

export const ViewOptions: Options = {
	layout: {
		hierarchical: {
			blockShifting: true,
			direction: 'UD',
			edgeMinimization: true,
			enabled: true,
			levelSeparation: 150,
			nodeSpacing: 150,
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
		shape: 'box',
	},
};
