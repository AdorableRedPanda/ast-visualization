import generate from '@babel/generator';
import { Node, isIdentifier } from '@babel/types';

export const getNodeLabel = (node: Node) => {
	switch (node.type) {
		case 'BinaryExpression':
		case 'UnaryExpression':
			return `Operator: ${node.operator}`;
		case 'JSXIdentifier':
		case 'Identifier':
			return node.name;
		case 'JSXText':
		case 'StringLiteral':
			return node.value;
		case 'NumericLiteral':
			return node.value.toString(10);
	}

	return node.type;
};
