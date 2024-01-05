import type { SourceLocation } from '@babel/types';

export interface ViewNode {
	id: string;
	label: null | number | string;
	loc: SourceLocation | null;
	shape: string;
}

interface Edge {
	from: string;
	label: null | number | string;
	to: string;
}

export interface ViewTree {
	edges: Edge[];
	nodes: ViewNode[];
}
