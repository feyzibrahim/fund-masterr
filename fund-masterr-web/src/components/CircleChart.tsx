"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function CircleChart() {
	const [dropDownList, setDropDownList] = useState<string[]>();

	const [activeDropDownContent, setActiveDropDownContent] = useState<any>();

	const [currentData, setCurrentData] = useState<any>();

	useEffect(() => {
		// api call
		const response = {
			content: {
				abc: [
					{ label: "Pending", value: 20 },
					{ label: "Approved", value: 20 },
					{ label: "Rejected", value: 20 },
				],
				xyz: [
					{ label: "Pending", value: 20 },
					{ label: "Approved", value: 20 },
					{ label: "Rejected", value: 20 },
				],
				afr: [
					{ label: "Pending", value: 20 },
					{ label: "Approved", value: 20 },
					{ label: "Rejected", value: 20 },
				],
			},
		};

		const keyArr = [];

		for (const key in response.content) {
			keyArr.push(key);
		}

		setDropDownList(keyArr);

		setCurrentData(response.content);
	}, []);

	const selectActiveDropDown = (key: any) => {
		if (currentData) {
			const activeDropDownArray = currentData[key];
			setActiveDropDownContent(activeDropDownArray);
		}
	};

	return (
		<div>
			{dropDownList?.map((key) => (
				<Button key={key} onClick={() => selectActiveDropDown(key)}>
					{key}
				</Button>
			))}

			<CardType
				title="Application"
				total={2324}
				chart={{
					series: activeDropDownContent,
				}}
			/>
		</div>
	);
}
