"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter, useSearchParams } from "next/navigation"; // import useSearchParams
import { Suspense, useEffect, useState } from "react";

function ShowActiveTodayToggleReal() {
	const router = useRouter();
	const searchParams = useSearchParams(); // initialize useSearchParams
	const [activeToday, setActiveToday] = useState<boolean>(false);

	// Set the initial activeToday from the query parameter when the component mounts
	useEffect(() => {
		const activeTodayParam = searchParams.get("activeToday");
		if (activeTodayParam === "false") {
			setActiveToday(true);
		} else {
			setActiveToday(false);
		}
	}, [searchParams]);

	const handleActiveTodaySelect = (selectedActiveToday: boolean) => {
		const currentUrl = new URL(window.location.href);
		const searchParams = new URLSearchParams(currentUrl.search);

		if (selectedActiveToday) {
			searchParams.set("activeToday", String(!selectedActiveToday));
		} else {
			searchParams.delete("activeToday");
		}

		const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`;
		router.replace(newUrl); // Use replace to update the URL without adding to history
	};

	return (
		<div className="flex items-center space-x-2">
			<Switch
				id="active-today"
				checked={activeToday}
				onCheckedChange={(val) => handleActiveTodaySelect(val)}
			/>
			<Label htmlFor="active-today">Show All</Label>
		</div>
	);
}

export function ShowActiveTodayToggle() {
	return (
		<Suspense fallback={<div>Something went wrong</div>}>
			<ShowActiveTodayToggleReal />
		</Suspense>
	);
}
