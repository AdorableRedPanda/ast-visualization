import type { ViewTree } from 'src/types';

import traverse from '@babel/traverse';
import { Node } from '@babel/types';

import { getNodeLabel } from './getNodeLabel';

export function transformAst (ast: Node) {
	const tree: ViewTree = {
		edges: [],
		nodes: [],
	};

	const idStack: string[] = [ '' ];

	traverse(ast, {
		enter (path) {
			const parentId = idStack.at(-1) as string;

			const nextId = crypto.randomUUID();

			tree.edges.push({ from: parentId, label: path.parentKey, to: nextId });

			const label = getNodeLabel(path.node);
			if (label.trim()) {
				tree.nodes.push({ id: nextId, label, loc: path.node.loc || null, shape: 'box' });
			}

			idStack.push(nextId);
		},
		exit () {
			idStack.pop();
		},

		noScope: true,
	});

	return tree;
}
