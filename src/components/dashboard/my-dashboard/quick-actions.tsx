import React from "react";
import Link from "next/link";
import { Bookmark, Compass, DatabasePlus, FolderCog } from "lucide-react";

type QuickActionsProps = {
	myStudiosCount: number;
	totalStudiosCount: number;
	myBookingsCount: number;
};

type Action = "add-studio" | "explore" | "my-listings" | "view-bookings";

const actionIcons: Record<Action, React.ReactNode> = {
	"add-studio": <DatabasePlus size={22} />,
	explore: <Compass size={22} />,
	"my-listings": <FolderCog size={22} />,
	"view-bookings": <Bookmark size={22} />,
};

const QuickActions = ({
	myStudiosCount,
	totalStudiosCount,
	myBookingsCount,
}: QuickActionsProps) => {
	const actions: {
		key: Action;
		label: string;
		description: string;
		href: string;
		badge?: string;
	}[] = [
		{
			key: "add-studio",
			label: "Add Studio",
			description: "List a new space",
			href: "/add-new-studio",
			badge: "+ New",
		},
		{
			key: "explore",
			label: "Explore Studios",
			description: "Find creative spaces",
			href: "/studios",
			badge: `${totalStudiosCount} live`,
		},
		{
			key: "my-listings",
			label: "My Listings",
			description: "Manage your listings",
			href: "/my-listings",
			badge: `${myStudiosCount} owned`,
		},
		{
			key: "view-bookings",
			label: "View Bookings",
			description: "Your reservations",
			href: "/my-bookings",
			badge: `${myBookingsCount} total`,
		},
	];

	return (
		<section>
			<h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
				Quick Actions
			</h2>

			<div className="grid grid-cols-2 gap-3">
				{actions.map((action) => (
					<Link
						key={action.key}
						href={action.href}
						className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/20 transition hover:border-primary/40 hover:bg-primary/10"
					>
						<div className="flex items-center justify-between">
							<span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 transition group-hover:bg-primary group-hover:text-primary-foreground">
								{actionIcons[action.key]}
							</span>
							{action.badge && (
								<span className="max-w-full truncate rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary ring-1 ring-primary/30">
									{action.badge}
								</span>
							)}
						</div>
						<div className="min-w-0">
							<p className="truncate font-semibold text-foreground">
								{action.label}
							</p>
							<p className="truncate text-xs text-muted-foreground">
								{action.description}
							</p>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};

export default QuickActions;
