import { Request, Response } from "express";

export const getStartAndEndDate = (
	req: Request,
	res: Response
): { start: Date; end: Date } => {
	const queryDate = req.query.date ? new Date(req.query.date as string) : new Date();

	// Set start and end of the day for the specified date in Singapore time
	const startTime = new Date(queryDate);
	startTime.setHours(0, 0, 0, 0);

	const endTime = new Date(queryDate);
	endTime.setHours(23, 59, 59, 999);

	// Convert Singapore time to India time by subtracting 2 hours and 30 minutes
	const start = new Date(startTime.getTime() - 2.5 * 60 * 60 * 1000);
	const end = new Date(endTime.getTime() - 2.5 * 60 * 60 * 1000);

	return { start, end };
};
