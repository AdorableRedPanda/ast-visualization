import type { SourceLocation } from '@babel/types';
export type { SourceLocation } from '@babel/types';

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

interface ErrorMessage {
	data: unknown;
	type: 'error';
}

interface SourceMessage {
	data: string;
	type: 'source';
}
interface TreeMessage {
	data: ViewTree;
	type: 'tree';
}
export type Message = ErrorMessage | SourceMessage | TreeMessage;
