import { Request, Response } from "express";

export const getStartAndEndDate = (
	req: Request,
	res: Response
): { start: Date; end: Date } => {
	const queryDate = req.query.date ? new Date(req.query.date as string) : new Date();
	console.log("🚀 ~ file: get-start-and-end-date.ts:8 ~ queryDate:", queryDate);

	// Set start and end of the day for the specified date
	const start = new Date(queryDate);
	start.setHours(0, 0, 0, 0);

	const end = new Date(queryDate);
	end.setHours(23, 59, 59, 999);

	return { start, end };
};
