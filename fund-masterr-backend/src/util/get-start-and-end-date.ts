import { Request, Response } from "express";

export const getStartAndEndDate = (
	req: Request,
	res: Response
): { start: Date; end: Date } => {
	const queryDate = req.query.date ? new Date(req.query.date as string) : new Date();

	// Get the UTC time for the specified date
	const utcDate = new Date(
		Date.UTC(
			queryDate.getUTCFullYear(),
			queryDate.getUTCMonth(),
			queryDate.getUTCDate()
		)
	);

	// Adjust for IST timezone (UTC+5:30)
	const IST_OFFSET = 5.5 * 60 * 60 * 1000;

	const start = new Date(utcDate.getTime() + IST_OFFSET);
	start.setHours(0, 0, 0, 0); // Start of the day in IST

	const end = new Date(utcDate.getTime() + IST_OFFSET);
	end.setHours(23, 59, 59, 999); // End of the day in IST

	return { start, end };
};
