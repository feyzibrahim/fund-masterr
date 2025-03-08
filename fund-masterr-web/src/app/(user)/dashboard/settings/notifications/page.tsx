import { Separator } from "@/components/ui/separator";
import { NotificationsForm } from "../components/notifications-form";
import { getNotification } from "../action";

export default async function SettingsNotificationsPage() {
	const { notification, error } = await getNotification();

	if (error || !notification) {
		return <div>{error || "Unexpected error occurred please try later!!!"}</div>;
	}

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Notifications</h3>
				<p className="text-sm text-muted-foreground">
					Configure how you receive notifications.
				</p>
			</div>
			<Separator />
			<NotificationsForm notification={notification} />
		</div>
	);
}
