import { NextFunction, Request, Response } from 'express';

const isOptionsReq = (req: Request) => req.method.toLowerCase() === 'options';
export function cors (req: Request, res: Response, next: NextFunction) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Max-Age', ' 86400');

	if (isOptionsReq(req)) {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');

		return res.status(200).json({});
	}

	next();
}
