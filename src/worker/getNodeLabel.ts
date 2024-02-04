import { Node } from '@babel/types';

export const getNodeLabel = (node: Node) => {
	switch (node.type) {
		case 'BinaryExpression':
		case 'UnaryExpression':
			return `${node.type}\n${node.operator}`;
		case 'JSXIdentifier':
		case 'Identifier':
			return `${node.type}\n${node.name}`;
		case 'JSXText':
		case 'StringLiteral':
		case 'NumericLiteral':
			return `${node.type}\n${node.value}`;
	}

	return node.type;
};
