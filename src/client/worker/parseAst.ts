import { parse } from '@babel/parser';

export function parseAst (source: string) {
	return parse(
		source,
		{
			plugins: [ 'jsx', 'typescript' ],
			sourceType: 'module',
		},
	);
}
