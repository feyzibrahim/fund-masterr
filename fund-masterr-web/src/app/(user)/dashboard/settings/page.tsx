import { Separator } from "@/components/ui/separator";
import { AccountForm } from "./components/account-form";
import { getUser } from "./action";

export default async function SettingsAccountPage() {
	const { user, error } = await getUser();

	if (error || !user) {
		return <div>{error || "Unexpected Error Occurred Please try later."}</div>;
	}

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Account</h3>
				<p className="text-sm text-muted-foreground">
					Update your account settings. Set your name and manage your email.
				</p>
			</div>
			<Separator />
			<AccountForm user={user} />
		</div>
	);
}
