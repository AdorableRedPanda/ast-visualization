import type { ViewTree } from 'src/types';

import generate from '@babel/generator';
import traverse, { NodePath } from '@babel/traverse';
import { Node, isIdentifier } from '@babel/types';

const getEdgeSegment = (path: NodePath) => (path.key === path.parentKey
	? `[${path.key}]`
	: `[${path.parentKey}][${path.key}]`);

export function transformAst (ast: Node) {
	const tree: ViewTree = {
		edges: [],
		nodes: [],
	};

	const idStack: string[] = [ '' ];

	traverse(ast, {
		enter (path) {
			const parentId = idStack.at(-1) as string;

			const nextId = `${parentId}${getEdgeSegment(path)}`;

			tree.edges.push({ from: parentId, label: path.parentKey, to: nextId });

			const label = getLabel(path.node);
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

function getLabel (node: Node) {
	switch (node.type) {
		case 'ClassProperty':
		case 'ClassMethod':
			const name = generate(node.key).code;

			return `${node.type}\n${name}`;
		case 'ClassDeclaration':
			const id = isIdentifier(node.id) ? node.id.name : '';

			return `${node.type}\n${id}`;
		case 'BinaryExpression':
		case 'UnaryExpression':
			return `Operator: ${node.operator}`;
		case 'JSXIdentifier':
		case 'Identifier':
			return node.name;
		case 'MemberExpression':
		case 'ObjectProperty':
			return generate(node).code;
		case 'JSXText':
		case 'StringLiteral':
			return node.value;
		case 'JSXElement':
			return generate(node.openingElement.name).code;
	}

	return node.type;
}
