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
import { usePathname, useRouter, useSearchParams } from "next/navigation"; // import useSearchParams
import { useState, useEffect, Suspense } from "react";

function URLDatePickerReal() {
	const router = useRouter();
	const pathname = usePathname();

	const searchParams = useSearchParams(); // initialize useSearchParams
	const [date, setDate] = useState<Date | undefined>(() => {
		// Initialize the date state with today's date
		const today = new Date();
		return today;
	});
	const [open, setOpen] = useState(false); // for controlling popover open state

	// Set the initial date from the query parameter when the component mounts
	useEffect(() => {
		const dateParam = searchParams.get("date");
		if (dateParam) {
			const urlDate = new Date(dateParam);
			if (!isNaN(urlDate.getTime())) {
				setDate(urlDate);
			}
		} else {
			setDate(new Date());
		}
	}, [searchParams]);

	const handleDateSelect = (selectedDate: Date | undefined) => {
		if (selectedDate) {
			setDate(selectedDate);

			const formattedDate = format(selectedDate, "yyyy-MM-dd");
			const today = format(new Date(), "yyyy-MM-dd"); // Format today's date for comparison
			const currentUrl = new URL(window.location.href);
			const searchParams = new URLSearchParams(currentUrl.search);

			if (formattedDate === today) {
				searchParams.delete("date"); // Remove the 'date' parameter if it's today
			} else {
				searchParams.set("date", formattedDate); // Add/update the 'date' parameter
			}

			const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`;
			router.replace(newUrl); // Update the URL without adding to history

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

export function URLDatePicker() {
	return (
		<Suspense fallback={<div>Something went wrong</div>}>
			<URLDatePickerReal />
		</Suspense>
	);
}
