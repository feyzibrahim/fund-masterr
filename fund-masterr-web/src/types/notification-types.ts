export interface INotification {
	_id: string;
	user: string;
	type: "all" | "mentions" | "none";
	mobile?: boolean;
	communication_emails?: boolean;
	marketing_emails?: boolean;
	security_emails: boolean;
}
