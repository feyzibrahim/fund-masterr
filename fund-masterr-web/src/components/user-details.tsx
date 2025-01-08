"use client";

import { AxiosRequest } from "@/lib/axios.instance";
import { formatCurrency } from "@/lib/utils";
import { ILedger } from "@/types/ledger-types";
import { useLayoutEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ISheet } from "@/types/sheet-types";

type UserDetailsProps = {
	ledgerId: string;
	sheets: ISheet[];
};

export function UserDetails({ ledgerId, sheets }: UserDetailsProps) {
	const [ledger, setLedger] = useState<ILedger>();

	useLayoutEffect(() => {
		const fetchLedger = async () => {
			const response = await AxiosRequest.get<ILedger>(`/ledger/${ledgerId}`);
			setLedger(response);
		};

		fetchLedger();
	}, [ledgerId]);

	return (
		<Card>
			<CardContent className="py-5">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<h2 className="text-2xl font-bold mb-2">
							{ledger && ledger.contact.firstName}
						</h2>
						<p className="text-foreground-secondary">
							{ledger && ledger.contact.email}
						</p>
					</div>
					<div className="text-right">
						<p className="text-lg font-semibold">
							Fund: {ledger && ledger.fund && formatCurrency(ledger.fund)}
						</p>
						{ledger && ledger.oldBalance !== undefined ? (
							<p className="text-foreground-secondary">
								Old Balance: {formatCurrency(ledger.oldBalance)}
							</p>
						) : (
							<Button>Set Old Balance</Button>
						)}
					</div>
				</div>
				<div className="grid grid-cols-3 gap-4 mt-6">
					<div>
						<p className="text-foreground-secondary">Sheets Count</p>
						<p className="text-xl font-semibold">{sheets.length}</p>
					</div>
					<div>
						<p className="text-foreground-secondary">Cancelled Sheets</p>
						<p className="text-xl font-semibold">
							{
								sheets.filter((sheet) => sheet.status === "cancelled")
									.length
							}
						</p>
					</div>
					<div>
						<p className="text-foreground-secondary">
							Total Amount Cancelled
						</p>
						<p className="text-xl font-semibold">
							{formatCurrency(
								sheets
									.filter((sheet) => sheet.status === "cancelled")
									.reduce((acc, sheet) => acc + sheet.amount, 0)
							)}
						</p>
					</div>
				</div>
				<div className="mt-4">
					<p className="text-foreground-secondary">Today&apos;s Net Total</p>
					<p className="text-2xl font-bold">
						{formatCurrency(
							sheets
								.filter((sheet) => sheet.status !== "cancelled")
								.reduce((acc, sheet) => acc + sheet.amount, 0)
						)}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
