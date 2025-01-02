export const redirectUrls = [
	{
		role: "super-admin",
		defaultUrl: "/admin-dashboard",
		allowedUrls: ["/admin-dashboard"],
	},
	{
		role: "user",
		defaultUrl: "/dashboard",
		allowedUrls: [
			"/dashboard",
			"/prior-auth-requests",
			"/company",
			"/claim-review",
			"/policy-workshop",
			"/modified_policies",
		],
	},
];
