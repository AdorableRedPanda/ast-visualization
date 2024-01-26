import generate from '@babel/generator';
import { Node, isIdentifier } from '@babel/types';

export const getNodeLabel = (node: Node) => {
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
			return node.type;
		case 'JSXText':
		case 'StringLiteral':
			return node.value;
		case 'JSXElement':
			return generate(node.openingElement.name).code;
	}

	return node.type;
};
