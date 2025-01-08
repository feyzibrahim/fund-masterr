import { Request, Response } from "express";

export const getStartAndEndDate = (
	req: Request,
	res: Response
): { start: Date; end: Date; indiaStart: Date; indiaEnd: Date } => {
	const queryDate = req.query.date ? new Date(req.query.date as string) : new Date();

	// Set start and end of the day for the specified date in Singapore time
	const start = new Date(queryDate);
	start.setHours(0, 0, 0, 0);

	const end = new Date(queryDate);
	end.setHours(23, 59, 59, 999);

	// Convert Singapore time to India time by subtracting 2 hours and 30 minutes
	const indiaStart = new Date(start.getTime() - 2.5 * 60 * 60 * 1000);
	const indiaEnd = new Date(end.getTime() - 2.5 * 60 * 60 * 1000);

	return { start, end, indiaStart, indiaEnd };
};
