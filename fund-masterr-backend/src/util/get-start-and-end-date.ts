import { Request, Response } from "express";

export const getStartAndEndDate = (
	req: Request,
	res: Response
): { start: Date; end: Date } => {
	const queryDate = req.query.date
		? new Date(req.query.date as string).toUTCString()
		: new Date().toUTCString();

	const convertedUTC = new Date(queryDate);
	const IST_OFFSET = 5.5 * 60 * 60 * 1000;

	// Set start and end of the day for the specified date
	const start = new Date(convertedUTC.getTime() + IST_OFFSET);
	start.setHours(0, 0, 0, 0);

	const end = new Date(convertedUTC.getTime() + IST_OFFSET);
	end.setHours(23, 59, 59, 999);

	return { start, end };
};
