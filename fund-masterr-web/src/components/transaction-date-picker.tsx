"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverPortal,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"; // import useSearchParams
import { useState, useEffect, Suspense } from "react";

function TransactionDatePickerReal() {
	const router = useRouter();
	const searchParams = useSearchParams(); // initialize useSearchParams
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [open, setOpen] = useState(false); // for controlling popover open state

	// Set the initial date from the query parameter when the component mounts
	useEffect(() => {
		const dateParam = searchParams.get("date");
		if (dateParam) {
			const urlDate = new Date(dateParam);
			if (!isNaN(urlDate.getTime())) {
				setDate(urlDate);
			}
		}
	}, [searchParams]);

	const handleDateSelect = (selectedDate: Date | undefined) => {
		if (selectedDate) {
			setDate(selectedDate);

			const formattedDate = format(selectedDate, "yyyy-MM-dd");

			router.push(`?date=${formattedDate}`);
			// Close the popover after selecting a date
			setOpen(false);
		}
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[240px] justify-start gap-2 text-left font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="w-4 h-4" />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverPortal>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={date}
						onSelect={handleDateSelect} // use new handler
						initialFocus
						disabled={(date) =>
							date > new Date() || date < new Date("1900-01-01")
						}
					/>
				</PopoverContent>
			</PopoverPortal>
		</Popover>
	);
}

export function TransactionDatePicker() {
	return (
		<Suspense fallback={<div>Something went wrong</div>}>
			<TransactionDatePickerReal />
		</Suspense>
	);
}
