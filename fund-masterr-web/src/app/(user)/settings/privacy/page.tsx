import { Separator } from "@/components/ui/separator";
import { PrivacyForm } from "../components/privacy-form";

export default function SettingsPrivacyPage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Privacy</h3>
				<p className="text-sm text-muted-foreground">
					Manage your privacy settings and control how your information is used.
				</p>
			</div>
			<Separator />
			<PrivacyForm />
		</div>
	);
}
