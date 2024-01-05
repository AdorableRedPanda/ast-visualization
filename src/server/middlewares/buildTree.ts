import { NextFunction, Request, Response } from 'express';

import { parseAst, transformAst } from '../../lib';

export function buildTree (req: Request, res: Response) {
	const { source } = req.body;

	try {
		const ast = parseAst(source);
		const viewTree = transformAst(ast);

		res.status(200).json(viewTree);
	} catch (e) {
		res.status(500).json(e);
	}
}
