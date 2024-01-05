import { NextFunction, Request, Response } from 'express';

export function validateBody (req: Request, res: Response, next: NextFunction) {
	const { source } = req.body;

	if (typeof source !== 'string') {
		res.status(400).json({ code: 'SOURCE_IS_NOT_STRING' });
	}

	next();
}
