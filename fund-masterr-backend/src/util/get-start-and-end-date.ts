import { Request, Response } from "express";

export const getStartAndEndDate = (
	req: Request,
	res: Response
): { start: Date; end: Date } => {
	const queryDate = req.query.date ? new Date(req.query.date as string) : new Date();

	// Ensure date is based on UTC
	const start = new Date(
		Date.UTC(
			queryDate.getUTCFullYear(),
			queryDate.getUTCMonth(),
			queryDate.getUTCDate(),
			0,
			0,
			0,
			0
		)
	);
	const end = new Date(
		Date.UTC(
			queryDate.getUTCFullYear(),
			queryDate.getUTCMonth(),
			queryDate.getUTCDate(),
			23,
			59,
			59,
			999
		)
	);

	return { start, end };
};
