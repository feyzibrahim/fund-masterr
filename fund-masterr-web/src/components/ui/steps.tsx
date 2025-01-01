import React from "react";

interface StepItemProps {
	title: string;
	description: string;
	children: React.ReactNode;
}

export function StepItem({ title, description, children }: StepItemProps) {
	return (
		<div className="mb-8">
			<h3 className="text-lg font-semibold">{title}</h3>
			<p className="text-muted-foreground mb-2">{description}</p>
			<div className="pl-4 border-l-2 border-muted-foreground">{children}</div>
		</div>
	);
}

export function Steps({ children }: { children: React.ReactNode }) {
	return <div className="space-y-4">{children}</div>;
}
