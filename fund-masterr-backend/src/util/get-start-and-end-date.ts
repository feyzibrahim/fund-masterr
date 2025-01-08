import { Request, Response } from "express";

export const getStartAndEndDate = (
	req: Request,
	res: Response
): { start: Date; end: Date } => {
	const queryDate = req.query.date ? new Date(req.query.date as string) : new Date();

	// Helper function to adjust the date to IST
	const adjustToIST = (date: Date) => {
		const offset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
		return new Date(date.getTime() + offset);
	};

	// Set start and end of the day for the specified date
	const start = adjustToIST(new Date(queryDate));
	start.setUTCHours(0, 0, 0, 0); // Set to start of the day in IST

	const end = adjustToIST(new Date(queryDate));
	end.setUTCHours(23, 59, 59, 999); // Set to end of the day in IST

	return { start, end };
};
